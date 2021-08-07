import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((_task) => _task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (_task) =>
          _task.title.toLowerCase().includes(search) ||
          _task.description.toLowerCase().includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((_task) => _task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task wit Id "${id}" not found.`);
    }
    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): void {
    const foundTask = this.tasks.find((_task) => _task.id === id);
    const taskIndex = this.tasks.findIndex((_task) => _task.id === id);
    this.tasks.splice(taskIndex, 1);
  }

  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = newStatus;
    return task;
  }
}
