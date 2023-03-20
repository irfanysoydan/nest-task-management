import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //Validation Pipe'ın amacı, kullanıcıdan gelen verileri doğrulamak. Burada global olarak kullanıyoruz.
  app.useGlobalInterceptors(new TransformInterceptor( )) //Transform Interceptor'ın amacı, kullanıcıya gönderilen verileri dönüştürmek. Burada global olarak kullanıyoruz.
  await app.listen(3000);
}
bootstrap();
