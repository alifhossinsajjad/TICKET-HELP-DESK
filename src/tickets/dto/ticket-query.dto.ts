import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketPriority, TicketStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class TicketQueryDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    enum: TicketStatus,
    description: 'Filter by ticket status (OPEN, IN_PROGRESS, CLOSED)',
  })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({
    enum: TicketPriority,
    description: 'Filter by ticket priority (LOW, MEDIUM, HIGH)',
  })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({
    description: 'Filter tickets by user ID',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({
    description: 'Search term across subject and description',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    default: 'createdAt',
    enum: ['createdAt', 'updatedAt', 'priority', 'status', 'subject'],
  })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'priority', 'status', 'subject'])
  sortBy: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort direction',
    default: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}

