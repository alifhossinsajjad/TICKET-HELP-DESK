import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    return res.redirect('/docs');
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'Ticket Help Desk API',
      timestamp: new Date().toISOString(),
    };
  }
}

