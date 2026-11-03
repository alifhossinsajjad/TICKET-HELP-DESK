import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module.js';
import { setupSwagger } from '../src/config/swagger.config.js';

const server = express();
let isReady = false;

async function bootstrapServer() {
  if (!isReady) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: true,
      credentials: true,
    });

    app.setGlobalPrefix('api/v1', {
      exclude: ['/', 'health'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    setupSwagger(app);
    await app.init();
    isReady = true;
  }
  return server;
}

export default async function handler(req: any, res: any) {
  const appServer = await bootstrapServer();
  appServer(req, res);
}

