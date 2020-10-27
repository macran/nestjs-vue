import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);
   app.enableCors();
  await app.listen(3000,"10.71.101.204");
}
bootstrap();
