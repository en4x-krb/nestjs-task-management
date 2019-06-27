import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks(): Tasks[] {
        return this.tasks;
    }

    getTaskById(id: string): Tasks {
        return this.tasks.find(task => task.id === id);
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
        // return this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
        this.tasks = this.tasks.filter(task => task.id !== id);
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
