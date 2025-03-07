import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
  constructor(private config: ConfigService) {}

  get eventManagementOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.config.get<string>('EVENT_MANAGEMENT_HOST', 'event-management-app-event-management-1'),
        port: this.config.get<number>('EVENT_MANAGEMENT_CLIENT_PORT'),
      },
    };
  }
}
