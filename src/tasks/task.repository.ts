import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
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

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); //task tablosu için bir query oluşturuyoruz. QueryBuilder bize sql sorguları yazmada yardımcı oluyor.
    query.where({user}); //userId filtresi varsa query'ye ekliyoruz. (userId'yi user'dan alıyoruz.

    if (status) {
      query.andWhere('task.status = :status', { status }); //status filtresi varsa query'ye ekliyoruz.
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      ); //search filtresi varsa query'ye ekliyoruz.
    }

    const tasks = query.getMany(); //query'yi çalıştırıyoruz. getMany() ile tüm taskları alıyoruz.
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
