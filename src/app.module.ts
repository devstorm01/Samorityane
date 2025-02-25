import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pool } from 'pg';

const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simple_todo', // Или 'new_todo_app', если используешь старую базу
  password: '123', // Твой пароль
  port: 5432,
  client_encoding: 'UTF8', // Явно задаём кодировку
});

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_POOL',
      useValue: dbPool,
    },
  ],
})
export class AppModule {}