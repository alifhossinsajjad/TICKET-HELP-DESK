import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { ApiTicketDocs } from './tickets.swagger.js';

@ApiTicketDocs.controller()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  @ApiTicketDocs.findAll()
  findAll() {
    return this.ticketService.findAll();
  }
}
