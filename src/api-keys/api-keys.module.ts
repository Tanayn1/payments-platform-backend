import { Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';

@Module({
  providers: [ApiKeysService],
  controllers: [ApiKeysController]
})
export class ApiKeysModule {}
