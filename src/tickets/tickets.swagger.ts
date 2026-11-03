import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ApiTicketDocs = {
  controller: () => ApiTags('Tickets'),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Create a new ticket',
        description: 'Creates a new support ticket linked to an existing user with UUID generation and priority defaults.',
      }),
      ApiResponse({
        status: 201,
        description: 'Ticket created successfully.',
      }),
      ApiResponse({
        status: 400,
        description: 'Bad Request - Validation error on body fields.',
      }),
      ApiResponse({
        status: 404,
        description: 'Not Found - The specified userId does not exist.',
      }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get all tickets with filters & pagination',
        description:
          'Retrieves a paginated list of tickets. Supports filtering by status, priority, userId, text search, and custom sorting.',
      }),
      ApiResponse({
        status: 200,
        description: 'Paginated tickets list with metadata (total, totalPages, hasNextPage).',
      }),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get ticket by UUID',
        description: 'Retrieves a single ticket by its UUID with associated user details.',
      }),
      ApiParam({
        name: 'id',
        description: 'Unique UUID of the ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
      }),
      ApiResponse({
        status: 200,
        description: 'Ticket found and returned.',
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid UUID format.',
      }),
      ApiResponse({
        status: 404,
        description: 'Ticket not found.',
      }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Update ticket by UUID',
        description: 'Partially updates a ticket (status, priority, subject, description) by its UUID.',
      }),
      ApiParam({
        name: 'id',
        description: 'Unique UUID of the ticket to update',
        example: '550e8400-e29b-41d4-a716-446655440000',
      }),
      ApiResponse({
        status: 200,
        description: 'Ticket updated successfully.',
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid input or invalid UUID format.',
      }),
      ApiResponse({
        status: 404,
        description: 'Ticket not found.',
      }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Delete ticket by UUID',
        description: 'Permanently deletes a ticket by its UUID.',
      }),
      ApiParam({
        name: 'id',
        description: 'Unique UUID of the ticket to delete',
        example: '550e8400-e29b-41d4-a716-446655440000',
      }),
      ApiResponse({
        status: 200,
        description: 'Ticket successfully deleted.',
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid UUID format.',
      }),
      ApiResponse({
        status: 404,
        description: 'Ticket not found.',
      }),
    ),
};
