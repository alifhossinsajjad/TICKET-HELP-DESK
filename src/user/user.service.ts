import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alif Mia', email: 'alif@example.com' },
    { id: 2, name: 'Jamil Mia', email: 'jamil@example.com' },
  ];

  getAllUsers() {
    return this.users;
  }

  createUser(userData: CreateUserDto) {
    const newUser: User = {
      id: Date.now(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }
}
