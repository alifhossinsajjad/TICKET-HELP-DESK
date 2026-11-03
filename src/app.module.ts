import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { TicketsModule } from './tickets/tickets.module.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    TicketsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
