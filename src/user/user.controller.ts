import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ApiUserDocs } from './user.swagger.js';

@ApiUserDocs.controller()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiUserDocs.getUsers()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiUserDocs.createUser()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
