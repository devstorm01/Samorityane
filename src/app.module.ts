import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './utils/saveEntityToFile';
import { Pool } from 'pg';

const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simple_todo', // Или твоя база
  password: '123',
  port: 5432,
  client_encoding: 'UTF8',
});

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    FileService,
    {
      provide: 'DATABASE_POOL',
      useValue: dbPool,
    },
  ],
})
export class AppModule {}