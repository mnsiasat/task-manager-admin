import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export enum Status {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export interface Task {
  id: string
  title: string
  status: Status
  description: string
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string

  @IsString()
  @IsOptional()
  description?: string
}

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  status?: Status

  @IsString()
  @IsOptional()
  description?: string
}
