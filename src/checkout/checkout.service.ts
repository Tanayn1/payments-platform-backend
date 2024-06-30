import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentFormDto, checkoutSessionDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
    constructor(private prisma: PrismaService) {}

    async createCheckoutSession(dto : checkoutSessionDto) {
        const { priceIDs, trialLength } = dto
        try {
            const storeIDs = [];
            const productNames = [];
            const prices = [];
            const productIDs = [];
            for (const priceID of priceIDs) {
                const price = await this.prisma.prices.findUnique({where: {id: priceID}});
                const product = await this.prisma.products.findUnique({where: {id: priceID}});
                storeIDs.push(price.storeId)
                productNames.push(product.name)
                prices.push(price.price)
                productIDs.push(product.id)
            }
            const total = eval(prices.join('+'));
            console.log(prices)

            const areAllStoreIDsTheSame = storeIDs.every((id)=>{id === storeIDs[0]})
            if (areAllStoreIDsTheSame === false) return;

            const price = await this.prisma.prices.findUnique({where: {id: priceIDs[0]}});
            const product = await this.prisma.products.findUnique({where: {id: price.productId}});
            const store = await this.prisma.companies.findUnique({where: {id: storeIDs[0]}})
            console.log(price,product)

            const checkoutSession = await this.prisma.checkoutSessions.create({
                data: {
                    priceIds: priceIDs,
                    productIds: productIDs,
                    storeId: store.id,
                    currency: store.currency,
                    amount: total,
                    billingPeriod: price.billingPeriod,
                    testmode: store.testmode,
                    trialPeriod: trialLength ? trialLength as number : 0,
                    status: 'pending',
                    productNames: productNames,
                    cancelUrl: '',
                    successUrl: '',
                    companyName: store.name,
                    expiry: '',
                    type: price.priceType
                    
                }
            });
            const webhooks = await this.prisma.webHooks.findMany({ where: { storeId: product.storeId, testMode: price.testmode}})
            if (webhooks === null || undefined) return checkoutSession.id
            const webhooksWithSelectedEvent = [];
            webhooks.forEach((webhook)=>{
                if (webhook.events.includes('checkout_session_created')) {
                    webhooksWithSelectedEvent.push(webhook)
                }
            });
            if (webhooksWithSelectedEvent.length === 0) return checkoutSession.id
            
            const body = JSON.stringify({
                eventType: 'checkout_session_created',
                data: {

                }
            })
            webhooksWithSelectedEvent.forEach( async (webhook)=>{
                try {
                    const response = await fetch(webhook.url, {
                        method: "POST",
                        body: body
                    })
                    //change this
                    await this.prisma.webHookResponses.create({ 
                        data: {
                            id: webhook.id,
                            storeId: webhook.storeId,
                            testMode: webhook.testMode,
                            response:  response ? JSON.stringify(response) : JSON.stringify({error: "Not Found", status: 404}),
                            webhookUrl: webhook.url,
                            webhookSent: body
                    }})
                } catch (error) {
                    console.log(error)
                }
            })
            console.log(checkoutSession)
            return checkoutSession.id
        } catch (error) {
            console.log(error)
        }

    }

    async cancelCheckoutSession(checkoutSessionId : string, status : string) {
        await this.prisma.checkoutSessions.update({
            where: {id: checkoutSessionId}, 
            data: {status: 'cancelled'}})
    }

    async fetchCheckoutSession(checkoutSessionId : string) {
        const checkoutSession = await this.prisma.checkoutSessions.findUnique({where: {id: checkoutSessionId}});
        return checkoutSession;
    }

    async createPaymentForm(dto : PaymentFormDto, userID : string, res : Response) {
        const { storeId, trialLength, collectBilling, 
        collectPhoneNumber, priceIds, 
        ProductIds, successUrl, cancelUrl } = dto
        const store = await this.prisma.companies.findUnique({where: { id: storeId  }})
        if (store.owner !== userID) {
            //check if in sharholders
            return new UnauthorizedException()
        }

        let sum = 0

        for (let index = 0; index < priceIds.length; index++) {
                    sum = sum + priceIds[index].price       
        }
        const paymentForm = await this.prisma.paymentForms.create({data: {
            storeId: storeId,
            currency: store.currency,
            status: 'Live',
            amount: sum,
            testmode: store.testmode,
            trialPeriod: trialLength,
            cancelUrl: cancelUrl,
            successUrl: successUrl,
            collectBilling: collectBilling,
            collectPhone: collectPhoneNumber,
            pricesIds: priceIds,
            productIds: ProductIds,
            productNames: [],
            companyName: store.name,
        }})

        console.log('paymentform id ', paymentForm.id)

        return res.send({message: 'Success', paymentFormId: paymentForm.id}).status(200)

    }

    async fetchPaymentForms(res: Response, userId : string, storeId : any) {
        if (storeId.id === null) {
            return new BadRequestException('no store id')
        }
        const paymentForms = await this.prisma.paymentForms.findMany({where: { storeId: storeId.id }});
        const store = await this.prisma.companies.findUnique({where: { id: storeId.id } });
        console.log(paymentForms)

        if (store.owner !== userId ) {
            //check if shareholders
            return new UnauthorizedException()
        }

        return res.send({message:'Success', paymentForms}).status(200)
    }
}
