import { BadRequestException, Body, Controller, Get, Param, Post, Render, Req,  Res, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Request, Response } from 'express';
import { PaymentFormDto, checkoutSessionDto } from './dto/checkout.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

    @Post('createPaymentForm')
    @UseGuards(AuthGuard)
    createPaymentLink(@Body() dto: PaymentFormDto, @Req() req , @Res() res : Response ) {
        const userId = req.user.sub;
        return this.checkoutService.createPaymentForm(dto, userId, res)
    }

    @Get('fetchPaymentForms/:id')
    @UseGuards(AuthGuard)
    fetchPayments(@Req() req, @Res() res: Response, @Param() id : string) {
        const userId = req.user.sub;
        return this.checkoutService.fetchPaymentForms(res, userId, id)
    }

}
