import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

// eslint-disable-next-line
require('dotenv').config({ path: join(__dirname, '..', '..', '..', '.env') });

const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export = mysqlConfig;
