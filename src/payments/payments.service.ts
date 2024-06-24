import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) {}

    async processPayment() {}
    
    async processPaymentTestMode( req: Request, res : Response, checkoutSessionId : string) {
        const checkoutSession = await this.prisma.checkoutSessions.findUnique({where : { id: checkoutSessionId, testmode: true }});
        if (!checkoutSession) return res.status(404).send({ error: 'checkout session does not exist' });
        await this.prisma.payments.create({data: {
            storeId: checkoutSession.storeId,
            priceIds: checkoutSession.priceIds,
            status: 'success',
            amount: checkoutSession.amount,
            currency: checkoutSession.currency,
            testmode: true,
            type: checkoutSession.type,
        }});
        const store = await this.prisma.companies.findUnique({where: {id: checkoutSessionId}});
        const newBalance = store.storeBalance + checkoutSession.amount
        await this.prisma.companies.update({where: {id: checkoutSession.storeId}, data: {storeBalance: newBalance}});
        const webhooks = await this.prisma.webHooks.findMany({where: { storeId: store.id, testMode: true }})
        if (!webhooks) {
            //do something
            return res.status(200).send({message: 'payment success'});       
         } 
        const webhooksWithSelectedEvent = [];
        webhooks.forEach((webhook)=>{
           if (webhook.events.includes('checkout_session_completed')) {
            webhooksWithSelectedEvent.push(webhook)
           }
        })
        if (webhooksWithSelectedEvent.length === 0) {
            //do something
            return res.status(200).send({message: 'payment success'});
        }

        const body = JSON.stringify({
            eventType: 'checkout_session_completed',
            data: {
                
            }
        });

        webhooksWithSelectedEvent.forEach(async (webhook)=>{
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
                        response:  response ? JSON.stringify(response) : JSON.stringify({ error: "Not Found", status: 404 }),
                        webhookUrl: webhook.url,
                        webhookSent: body
                }})
            } catch (error) {
                console.log(error)
            }
        })

        return res.status(200).send({message: 'payment success'});
    }

    async UpdateCheckoutStatus(checkoutSessionId : string) {
        await this.prisma.checkoutSessions.update({where: { id: checkoutSessionId}, data: { status: 'completed' }})
    }
}
