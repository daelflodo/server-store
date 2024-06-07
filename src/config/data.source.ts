import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({});
const configService = new ConfigService

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: true, // Deshabilitar la verificación del certificado (autoasignado)
  },
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDs = new DataSource(dataSourceConfig);


