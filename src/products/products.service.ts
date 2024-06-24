import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async getProducts(req : Request, res : Response, userID : string, storeId : string) {
        const products = await this.prisma.products.findMany({where: { storeId: storeId }});
        const store = await this.prisma.products.findUnique({where: {id: storeId}});
        if (store.id !== userID ) {
            //check if in sharholders

            res.send({message: 'Unauthorised to access this store'}).status(401)
        }
        res.send({message: 'Success', products: products}).status(200)
    }
}
