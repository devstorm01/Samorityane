import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import { Pool } from 'pg';

@Injectable()
export class FileService {
  constructor(@Inject('DATABASE_POOL') private readonly dbPool: Pool) {}

  saveTaskEntityToFile() {
    const taskEntityDesc = {
      name: 'Task',
      fields: [
        { name: 'id', type: 'number', primary: true, generated: true },
        { name: 'title', type: 'string', nullable: false },
        { name: 'completed', type: 'boolean', default: false },
      ],
    };
    fs.writeFileSync('task.entity.json', JSON.stringify(taskEntityDesc, null, 2), 'utf8');
    console.log('Task entity saved to task.entity.json');
  }

  async saveTasksToFile() {
    try {
      console.log('Fetching tasks from DB...');
      const result = await this.dbPool.query('SELECT * FROM tasks');
      const tasks = result.rows;
      console.log('Tasks fetched:', tasks);

      if (!tasks || tasks.length === 0) {
        console.log('No tasks to save');
        fs.writeFileSync('tasks.json', JSON.stringify([], null, 2), 'utf8');
        return;
      }

      console.log('Saving tasks to file...');
      fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
      console.log('Tasks saved to tasks.json');
    } catch (error) {
      console.error('Error saving tasks to file:', error);
      throw error; // Чтобы увидеть ошибку в ответе API
    }
  }
}