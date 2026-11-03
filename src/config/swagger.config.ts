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

  // Use CDN assets so Vercel Serverless renders Swagger UI cleanly without missing local static assets
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.css',
    ],
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.js',
    ],
    customSiteTitle: 'Ticket Help Desk API Docs',
  });
}
