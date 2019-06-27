import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks(): Tasks[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Tasks[] {
        const { status, search } = filterDto;
        let tasks: Tasks[] = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Tasks {
        const found = this.tasks.find(task => task.id === id);
        
        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Tasks {
        const { title, description } = createTaskDto;
        const task: Tasks = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        // return this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Tasks {
        // this.tasks = this.tasks.map((task) => {
        //     if (task.id === id) {
        //         task.status = status
        //     }
        //     return task;
        // });
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
