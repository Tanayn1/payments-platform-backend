import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoresService } from './stores/stores.service';
import { CheckoutService } from './checkout/checkout.service';
import { CheckoutModule } from './checkout/checkout.module';
import { PaymentsModule } from './payments/payments.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, CheckoutModule, PaymentsModule, ApiKeysModule, StoresModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, StoresService, CheckoutService],
})
export class AppModule {}
