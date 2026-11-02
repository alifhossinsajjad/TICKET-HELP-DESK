import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupSwagger } from './config/swagger.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Security & CORS configuration
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 2. Global API Versioning/Prefix
  app.setGlobalPrefix('api/v1');

  // 3. Graceful Shutdown Hooks (Closes Prisma & DB connections cleanly on SIGTERM)
  app.enableShutdownHooks();

  // 4. Global Validation Pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 5. Centralized Swagger Documentation
  setupSwagger(app);

  // 6. Start Server
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application running at: http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}

await bootstrap();
