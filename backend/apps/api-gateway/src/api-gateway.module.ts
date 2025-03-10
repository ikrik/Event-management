import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
