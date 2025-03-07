import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientConfigService } from './client-config.service';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validationSchema: joi.object({
        EVENT_MANAGEMENT_CLIENT_PORT: joi.number().default(3002),
      }),
    }),
  ],
  providers: [ClientConfigService],
  exports: [ClientConfigService],
})
export class ClientConfigModule {}
