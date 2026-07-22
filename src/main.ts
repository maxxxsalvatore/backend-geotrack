import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Izinkan Frontend dari domain kamu untuk mengakses API Backend
  app.enableCors({
    origin: [
      'https://trackinginternal.com',
      'https://www.trackinginternal.com',
      'http://localhost:3000', // Untuk kebutuhan testing lokal
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Application is running on port: ${port}`);
}
bootstrap();