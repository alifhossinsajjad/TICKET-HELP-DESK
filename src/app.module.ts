import { Module } from '@nestjs/common';


import { UserModule } from './user/user.module.js';
import { TicketsModule } from './tickets/tickets.module.js';



@Module({
  imports: [

    UserModule,
    TicketsModule,
  ],

})
export class AppModule {}
  