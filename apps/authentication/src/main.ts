/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeApp } from 'firebase-admin/app';
import { AppModule } from './app/app.module';
import { credential } from 'firebase-admin';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../serviceAccount.json');
initializeApp({
  credential: credential.cert(serviceAccount),
});

async function bootstrap() {
  // Rest configuration
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8002;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MS Accounts')
    .setDescription('Create expenses accounts')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  // start as microservice
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 9002,
    },
  });
  await app.startAllMicroservices();

  // start as REST service
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
