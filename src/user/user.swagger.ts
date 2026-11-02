import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ApiUserDocs = {
  controller: () => ApiTags('Users'),

  getUsers: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get all users',
        description: 'Retrieves a list of all registered users along with their associated tickets.',
      }),
      ApiResponse({
        status: 200,
        description: 'List of users returned successfully.',
      }),
      ApiResponse({
        status: 500,
        description: 'Internal server error.',
      }),
    ),

  createUser: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Create a new user',
        description: 'Registers a new user into the database with validated name and unique email.',
      }),
      ApiResponse({
        status: 201,
        description: 'User successfully created in Neon PostgreSQL.',
      }),
      ApiResponse({
        status: 400,
        description: 'Validation failed (e.g., invalid email or short name).',
      }),
      ApiResponse({
        status: 409,
        description: 'Conflict - User with this email already exists.',
      }),
    ),
};

