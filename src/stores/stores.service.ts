import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { createStoresDto } from './dto/stores.dto';

@Injectable()
export class StoresService {
    constructor(private prisma: PrismaService) {}

    async fetchStores(userId : string ) {
        const stores = await this.prisma.companies.findMany({where: { owner: userId}});
        return stores
        
    }

    async createStore(userId : string, dto : createStoresDto, res : Response) {
        const { name, currency } = dto
            const store = await this.prisma.companies.create({data: {
                name: name,
                owner: userId,
                shareHolders: [],
                testmode: true,
                currency: currency
            }})
            console.log(store) 
            return res.send({message: 'Success', store: store}).status(200)

    }
}
