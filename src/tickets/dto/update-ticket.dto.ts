import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { TicketStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto.js';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({
    enum: TicketStatus,
    description: 'Current status of the ticket (OPEN, IN_PROGRESS, CLOSED)',
  })
  @IsOptional()
  @IsEnum(TicketStatus, { message: 'Status must be OPEN, IN_PROGRESS, or CLOSED' })
  status?: TicketStatus;
}

