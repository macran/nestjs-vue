import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dot';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getTasks(filterDto: GetTasksFilterDto,
  @GetUser() user:User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto,user);
  }
  
  async getTaskById(id: number,
  user: User
  ): Promise<Task> {
    const found = await this.taskRepository.findOne({where:{id,userId:user.id}});

    if (!found) {
      throw new NotFoundException(`没有找到ID是 ${id}的数据`);
    }
    return found;
  }
 
  async createTask(createTaskDto: CreateTaskDto,
    @GetUser() user:User
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
  }
  
  async deleteTask(id: number, @GetUser() user: User,
  ): Promise<void> {
    const result = await this.taskRepository.delete({ id,userId:user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`not found the id:${id} task`);
    }
  }
  
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user:User,
  ): Promise<Task> {
    const task = await this.getTaskById(id,user);
    task.status = status;
    await task.save();
    return task;
  }
  
}
