import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TicketPriority } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    example: 'Cannot connect to production database',
    description: 'Brief summary of the issue (5 - 150 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Subject must be at least 5 characters long' })
  @MaxLength(150, { message: 'Subject cannot exceed 150 characters' })
  subject: string;

  @ApiProperty({
    example: 'Getting connection timeout error whenever connecting from worker node.',
    description: 'Detailed description of the problem (min 10 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @ApiPropertyOptional({
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
    description: 'Priority level of the ticket',
  })
  @IsOptional()
  @IsEnum(TicketPriority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
  priority?: TicketPriority;

  @ApiProperty({
    example: 1,
    description: 'ID of the user creating the ticket',
  })
  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}

