import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    { cors: true }
  );

  // Set prefix and validation
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
