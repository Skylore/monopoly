import { json } from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { swaggerSetup } from './swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.use(json({ limit: '1mb' }));
  swaggerSetup('docs', app);

  await app.listen(process.env.SERVER_PORT);

  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
}
bootstrap();
