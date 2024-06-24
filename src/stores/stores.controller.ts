import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { checkoutSessionDto } from 'src/checkout/dto/checkout.dto';
import { createStoresDto } from './dto/stores.dto';

@Controller('stores')
export class StoresController {
    constructor(private readonly storesservice: StoresService){}

    @Get('getStores')
    @UseGuards(AuthGuard)
    async getStores(@Request() req ) {
        const userId = req.user.sub
        return this.storesservice.fetchStores(userId)

    }

    @Post('createStore')
    @UseGuards(AuthGuard)
    createStore(@Body() dto: createStoresDto, @Request() req, @Res() res : Response) {
        const userId = req.user.sub

        return this.storesservice.createStore(userId, dto, res)
    }
}
