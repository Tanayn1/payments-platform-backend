import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { WebhookDto } from './dto/webhook.dto';

@Controller('webhooks')
export class WebhooksController {
    constructor(private webhookService: WebhooksService) {}

    @Post('createWebhook')
    @UseGuards(AuthGuard)
    createWebhook(@Req() req, @Res() res : Response, @Body() dto : WebhookDto) {
        const userID = req.user.sub;
        return this.webhookService.createWebhook(dto, res, userID)
    }
    

    @Get('fetchWebhooks/:id')
    @UseGuards(AuthGuard)
    fetchWebhooks(@Req() req, @Res() res : Response, @Param() id : any) {
        const userID = req.user.sub;
        const storeId = id.id
        return this.webhookService.fetchWebhooks(res, storeId, userID)
    }
}
