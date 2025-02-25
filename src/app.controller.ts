import { Controller, Get, Post, Put, Delete, Body, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Отображение списка задач через шаблон (как было)
  @Get()
  @Render('index')
  async getHello() {
    const tasks = await this.appService.getAllTasks();
    return { tasks };
  }

  // API: Получить все задачи (JSON)
  @Get('tasks')
  async getAllTasks() {
    return await this.appService.getAllTasks();
  }

  // API: Создать задачу
  @Post('tasks')
  async createTask(@Body() body: { title: string; completed?: boolean }) {
    return await this.appService.createTask(body.title, body.completed || false);
  }

  // API: Обновить задачу
  @Put('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: { title: string; completed: boolean },
  ) {
    return await this.appService.updateTask(parseInt(id), body.title, body.completed);
  }

  // API: Удалить задачу
  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string) {
    await this.appService.deleteTask(parseInt(id));
    return { message: `Task ${id} deleted` };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return { message: this.appService.getAbout() };
  }
}