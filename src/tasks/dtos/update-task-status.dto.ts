import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) //TaskStatus enum'undan bir değer olmalı
  status: TaskStatus;
}
