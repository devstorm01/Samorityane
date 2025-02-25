import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('DATABASE_POOL') private readonly dbPool: Pool) {}

  async getAllTasks(): Promise<any[]> {
    const result = await this.dbPool.query('SELECT * FROM tasks');
    return result.rows;
  }

  async createTask(title: string, completed: boolean = false): Promise<any> {
    const result = await this.dbPool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
      [title, completed],
    );
    return result.rows[0];
  }

  async updateTask(id: number, title: string, completed: boolean): Promise<any> {
    const result = await this.dbPool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id],
    );
    return result.rows[0];
  }

  async deleteTask(id: number): Promise<void> {
    await this.dbPool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }

  async getHello(): Promise<any[]> {
    return this.getAllTasks();
  }

  getAbout(): string {
    return 'This is the About page!';
  }
}