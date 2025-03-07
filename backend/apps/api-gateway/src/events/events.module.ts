import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { EVENTS_MANAGEMENT_CLIENT } from './constants';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';

@Module({
  imports: [ClientConfigModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: EVENTS_MANAGEMENT_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.eventManagementOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class EventsModule {}
