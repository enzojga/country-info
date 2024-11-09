import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Obtenha o ConfigService

  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Obtenha o valor da porta do ConfigService
  const port = configService.get<number>('PORT') || 3002;
  console.log(`Application is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
