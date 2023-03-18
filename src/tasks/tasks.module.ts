import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], //forFeature ile TaskRepository kullanılabilir hale getirilir.
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
