import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Ticket Help Desk API')
    .setDescription('Enterprise Help Desk API built with NestJS, Prisma 7, and PostgreSQL')
    .setVersion('1.0')
    .addTag('Users', 'User management endpoints')
    .addTag('Tickets', 'Ticket help desk management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

