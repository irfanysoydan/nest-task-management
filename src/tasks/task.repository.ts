import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  // TaskRepository'nin amacı Task entity'si için özel methodlar yazmamızı sağlıyor.
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); //task tablosu için bir query oluşturuyoruz. QueryBuilder bize sql sorguları yazmada yardımcı oluyor.

    if (status) {
      query.andWhere('task.status = :status', { status }); //status filtresi varsa query'ye ekliyoruz.
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      ); //search filtresi varsa query'ye ekliyoruz.
    }

    const tasks = query.getMany(); //query'yi çalıştırıyoruz. getMany() ile tüm taskları alıyoruz.
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
