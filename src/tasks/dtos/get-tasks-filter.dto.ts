import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus) //TaskStatus enum'undan bir değer olmalı. Yani OPEN, IN_PROGRESS, DONE olmalı. 
  @IsOptional()
  status: TaskStatus;

  @IsString() 
  @IsOptional()
  search: string;
}
