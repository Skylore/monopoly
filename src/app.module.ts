import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './api/session/session.module';
import { BindingModule } from './api/binding/binding.module';
import { CardModule } from './api/card/card.module';
import { ChainingModule } from './api/chaining/chaining.module';
import { GroupModule } from './api/group/group.module';
import { PlayerModule } from './api/player/player.module';
import { UserModule } from './api/user/user.module';
import { JwtStrategy } from './api/user/strategy/jwt.strategy';

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
    UserModule,
    CardModule,
    GroupModule,
    PlayerModule,
    SessionModule,
    BindingModule,
    ChainingModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
