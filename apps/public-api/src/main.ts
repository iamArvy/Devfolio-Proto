import { NestFactory } from '@nestjs/core';
import { PublicApiModule } from './module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PublicApiModule);
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('The Documentation for the portfolio api')
    .addBearerAuth() // 👈 Add this line
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
