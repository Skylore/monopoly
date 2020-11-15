import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      synchronize: true,
      dropSchema: (process.env.NODE_ENV === 'test'),
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrationsRun: process.env.NODE_ENV === 'test',
      logging: true,
      logger: 'file',
      migrations: [`${__dirname}/db/migrations/**/*{.ts,.js}`],
      cli: {
        migrationsDir: 'src/db/migrations',
      },
    }),
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
