import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true, //// Remueve todo lo que no esta incluido en la definicion del objeto
      forbidNonWhitelisted: true, // Retorna un bad request si hay propiedades en el objeto no requeridas
    
      //para usar esto debo instalar 
      //npm install class-validator
      //npm install class-transformer
    
    
    })
  )
  await app.listen(3000);
}
bootstrap();
