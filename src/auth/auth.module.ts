import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './utils/constants';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtSecret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
