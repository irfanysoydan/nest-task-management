import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //Validation Pipe'ın amacı, kullanıcıdan gelen verileri doğrulamak. Burada global olarak kullanıyoruz.
  await app.listen(3000);
}
bootstrap();
