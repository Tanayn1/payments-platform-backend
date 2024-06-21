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



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, StoresService, CheckoutService],
})
export class AppModule {}
