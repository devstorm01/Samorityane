import { Controller, Get, Post, Put, Delete, Body, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { FileService } from './utils/saveEntityToFile'; // Убедись, что путь правильный

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  @Render('index')
  async getHello() {
    const tasks = await this.appService.getAllTasks();
    return { tasks };
  }

  @Get('tasks')
  async getAllTasks() {
    return await this.appService.getAllTasks();
  }

  @Post('tasks')
  async createTask(@Body() body: { title: string; completed?: boolean }) {
    return await this.appService.createTask(body.title, body.completed || false);
  }

  @Put('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: { title: string; completed: boolean },
  ) {
    return await this.appService.updateTask(parseInt(id), body.title, body.completed);
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string) {
    await this.appService.deleteTask(parseInt(id));
    return { message: `Task ${id} deleted` };
  }

  @Get('save-entity')
  saveEntity() {
    this.fileService.saveTaskEntityToFile();
    return { message: 'Entity saved to file' };
  }

  @Get('save-tasks')
  async saveTasks() {
    await this.fileService.saveTasksToFile();
    return { message: 'Tasks saved to file' };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return { message: this.appService.getAbout() };
  }
}