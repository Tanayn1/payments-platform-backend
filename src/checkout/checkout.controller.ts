import { BadRequestException, Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Request, Response } from 'express';
import { checkoutSessionDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}

    @Post('createSession')
    async checkout(@Body() dto : checkoutSessionDto, @Req() req : Request, @Res() res : Response,) {
        const checkoutSessionId = await this.checkoutService.createCheckoutSession(dto);
        if (checkoutSessionId) {
            return res.send({url: `http://localhost:3000/checkout?id=${checkoutSessionId}`, message: 'Success'})
        } else {
            throw new BadRequestException('Invalid PriceID')
        }
    }

    @Get(':id')
    async getSession(@Param('id') id : string, @Req() req : Request, @Res() res : Response) {
       const checkoutSession =  await this.checkoutService.fetchCheckoutSession(id);
       if (checkoutSession) {
        return res.send(checkoutSession)
       }
    }
}
