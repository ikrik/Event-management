import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  // Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() CreateEventDto: CreateEventDto) {
    return this.eventsService.create(CreateEventDto);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') pageSize = '5', @Query('searchLocation') searchLocation = '') {
    return this.eventsService.findAll({ page: Number(page), pageSize: Number(pageSize), searchLocation });
  }

  @Get('latest')
  findLatest() {
    return this.eventsService.findLatest();
  }

  @Get('autocomplete')
  autocomplete(@Query('query') query: string) {
    return this.eventsService.autocomplete(query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }
}
