import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import env from './shared/config/env';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: env.allowedOrigins,
  });
  morgan.token('remote-addr', (req: Request) => req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  app.use(morgan('combined'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
