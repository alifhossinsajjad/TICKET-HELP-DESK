import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { TicketQueryDto } from './dto/ticket-query.dto.js';
import { ApiTicketDocs } from './tickets.swagger.js';

@ApiTicketDocs.controller()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post()
  @ApiTicketDocs.create()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @ApiTicketDocs.findAll()
  findAll(@Query() query: TicketQueryDto) {
    return this.ticketService.findAll(query);
  }

  @Get(':id')
  @ApiTicketDocs.findOne()
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  @ApiTicketDocs.update()
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiTicketDocs.remove()
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ticketService.remove(id);
  }
}
