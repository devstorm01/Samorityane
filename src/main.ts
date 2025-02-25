import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); // Папка для статичных файлов
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Папка с шаблонами
  app.setViewEngine('hbs'); // Устанавливаем Handlebars
  await app.listen(3000);
}
bootstrap();
