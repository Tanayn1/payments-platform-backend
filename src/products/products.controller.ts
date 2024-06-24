import { Controller, Get, Param, Req, Request,  Res,  UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private ProductsService: ProductsService) {}

    @UseGuards(AuthGuard)
    @Get('getProducts/:id')
    getProducts(@Request() req, @Res() res : Response, @Param() storeId : string) {
        const userId = req.user.sub
        return this.ProductsService.getProducts(req, res, userId, storeId);
    }
}
