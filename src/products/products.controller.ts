import { Body, Controller, Get, Param, Post, Req, Request,  Res,  UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/products.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private ProductsService: ProductsService) {}

    @UseGuards(AuthGuard)
    @Get('getProducts/:id')
    getProducts(@Request() req, @Res() res : Response, @Param() id : string) {
        const userId = req.user.sub
        return this.ProductsService.getProducts(req, res, userId, id);
    }

    @UseGuards(AuthGuard)
    @Post('createProduct')
    createProduct(@Body() dto : CreateProductDto, @Request() req, @Res() res : Response) {
        const userID = req.user.sub
        return this.ProductsService.createProduct(dto, req, res, userID )
    }

    @UseGuards(AuthGuard)
    @Get('getPrices/:id')
    getPrices(@Request() req, @Res() res : Response, @Param() id : string) {
        const userID = req.user.sub
        return this.ProductsService.getPrices(req, res, id, userID)

    }
}
