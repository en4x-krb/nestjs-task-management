import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TaskService: TasksService) {

    }

    @Get()
    getAllTasks(): Tasks[] {
        return this.TaskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Tasks {
        return this.TaskService.getTaskById(id);
    }

    @Post()
    createTask(
        // @Body() body
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createTaskDto: CreateTaskDto
    ): Tasks {
        return this.TaskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.TaskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Tasks {
        return this.TaskService.updateTaskStatus(id, status);
    }
}
