import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter, CORS, TimeOutInterceptor } from './common';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Obtiene el servicio de configuración de la aplicación
  const PORT = configService.get('PORT'); // Obtiene el valor de configuración del puerto en el que se ejecutará la aplicación
  const reflector = app.get(Reflector);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)); // Excluye la password de las solicitudes
  
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  app.enableCors(CORS);

  app.setGlobalPrefix('api'); // para manejar las versiones

    const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Product-Store')
    .setDescription('API Product-Store ')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, '0.0.0.0', async () => {
    logger.log('Listening in port:' + `${await app.getUrl()}`);
  });
}
bootstrap();
