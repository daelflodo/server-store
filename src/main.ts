import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Main')
  
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT')
  
  await app.listen(PORT, '0.0.0.0', async () => {
    logger.log('Listening on port:' + `${await app.getUrl()}`);
  });
}
bootstrap();
