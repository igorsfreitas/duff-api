import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const typeOrmConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.TYPEORM_DATABASE,
  entities: [`${__dirname}/../../modules/**/**/*.entity{.ts,.js}`],
  subscribers: [`${__dirname}/../../modules/**/**/*.subscriber{.ts,.js}`],
  migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
  name: 'default',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  migrationsTableName: 'migrations_typeorm',
  synchronize: false,
  logging: false,
};
