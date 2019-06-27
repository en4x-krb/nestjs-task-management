import { TaskStatus } from "dist/tasks/tasks.model";

export class GetTasksFilterDto {
    status: TaskStatus;
    search: string;
}