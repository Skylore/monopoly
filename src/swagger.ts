import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('API Документация')
  .setDescription('Точки доступа к CPA')
  .setVersion('1.0')
  .build();

export const swaggerSetup = (path, app): void => {
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
  });

  SwaggerModule.setup(path, app, document);
};
