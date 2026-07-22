import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('GeoTrack Backend API')
    .setDescription('Dokumentasi API untuk Geotrack Operations & Authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Route /docs dipasang di sini
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();