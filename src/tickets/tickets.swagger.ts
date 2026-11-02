import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ApiTicketDocs = {
  controller: () => ApiTags('Tickets'),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get all tickets',
        description: 'Retrieves all help desk tickets with creator user details.',
      }),
      ApiResponse({
        status: 200,
        description: 'List of tickets returned successfully.',
      }),
      ApiResponse({
        status: 500,
        description: 'Internal server error.',
      }),
    ),
};

