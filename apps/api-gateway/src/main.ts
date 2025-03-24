import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

import { ValidationPipe } from '@nestjs/common';
import * as proxy from 'express-http-proxy';
async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    '/auth',
    proxy(process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001/auth'),
  );

  app.use(
    '/user',
    proxy(process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001/user'),
  );
  app.use(
    '/dashboard',
    proxy(process.env.DASHBOARD_SERVICE_URL ?? 'http://localhost:3002'),
  );
  // app.use(
  //   '/api',
  //   proxy(process.env.API_SERVICE_URL ?? 'http://localhost:3003'),
  // );
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
}
bootstrap();
