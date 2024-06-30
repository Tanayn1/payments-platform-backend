import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhooksService {
    constructor(private prisma: PrismaService) {}

    async createWebhook(dto : WebhookDto, res : Response, userID: string, ) {
        const { events, webhookUrl, storeId } = dto
        const store = await this.prisma.companies.findUnique({where: { id: storeId }});
        if (store.owner !== userID) {
            return new UnauthorizedException()
        }
        const webhook = await this.prisma.webHooks.create({ data: {
            testMode:store.testmode,
            storeId: storeId,
            events: events,
            webhookUrl: webhookUrl
            }})

        return res.send({message: 'Success', webhookId: webhook.id}).status(200)

    }

    async fetchWebhooks( res: Response, storeId : string, userId : string) {
        const check = await this.checks(storeId, userId);
        if (check === false) return new UnauthorizedException();

        const webhooks = await this.prisma.webHooks.findMany({ where: { storeId: storeId }});
        return res.send({message: 'Success', webhooks}).status(200)
    }

    async checks(storeId: string, userID: string) {
        const store = await this.prisma.companies.findUnique({where: { id: storeId }});
        if (store.owner !== userID) {
            return false
        }
    }
}
