import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/products.dto';
import { PricingObject } from './types/types';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async getProducts(req : Request, res : Response, userID : string, storeId : any) {
        console.log(storeId)
        const products = await this.prisma.products.findMany({where: { storeId: storeId.id }});
        const store = await this.prisma.companies.findUnique({where: { id: storeId.id }});
        if (store.owner !== userID ) {
            //check if in sharholders

           return res.send({message: 'Unauthorised to access this store'}).status(401)
        }
        console.log(products)
       return res.send({message: 'Success', products: products}).status(200)
    }

    async createProduct( dto : CreateProductDto, req : Request, res : Response, userID : string,) {
        const {name, description, pricesArray, storeId} = dto;
        console.log(name, description, pricesArray, storeId)
        const store = await this.prisma.companies.findUnique({where: {id: storeId}});
        if (store.owner !== userID ) {
            //check if in sharholders
            return res.send({message: 'Unauthorised to access this store'}).status(401);
        } 

        const newProduct = await this.prisma.products.create({data: {
            name: name,
            storeId: storeId,
            description: description, 
            testmode: store.testmode
        }});
        const priceIds = [];
        pricesArray.forEach(async (price)=>{
            const newPrices = await this.prisma.prices.create({data: {
                productId: newProduct.id,
                price: price.price,
                storeId: storeId,
                billingPeriod: price.billingPeriod,
                priceType: price.productType,
                testmode: store.testmode,
                currency: store.currency
            }});

            priceIds.push(newPrices.id);
        });
        return res.send({message: 'Success', data: { productId: newProduct.id, priceIds: priceIds } }).status(200)

    }
    async getPrices(req : Request, res : Response, productId : any, userID : string) {
        console.log(productId)
        const prices = await this.prisma.prices.findMany({where: {productId: productId.id}})
        const store = await this.prisma.companies.findUnique({where: {id: prices[0].storeId}});
        if (store.owner !== userID ) {
            //check if in sharholders
            return res.send({message: 'Unauthorised to access this store'}).status(401);
        } 

        return res.send({message: 'Success',  data: prices})
    }
}
