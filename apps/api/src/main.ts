import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthService } from './app/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  // Enable CORS for the client application
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  // Seed default user
  // const authService = app.get(AuthService);
  // await authService.ensureDefaultUser();

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
