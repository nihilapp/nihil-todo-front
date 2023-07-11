import {
  IUser, TodoStatus, UserRole, UserStatus
} from './entity.typs';

export interface ICreateUserDto {
  email: string;
  userName: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IUserResDto {
  message: string;
  user: IUser;
  tokenExp?: number;
}

export interface IUpdateUserDto {
  userName?: string;
  role?: UserRole,
  status?: UserStatus;
}

export interface ICreateWithdrawalDto {
  userId: number;
  text?: string;
}

export interface ICookies {
  sign: boolean;
  tokenExp: number;
}

export interface ICreateTodoDto {
  userId: number;
  content: string;
}

export interface IUpdateTodoDto {
  content: string;
}

export interface ICreateSubTodoDto {
  userId: number;
  todoId: number;
  content: string;
}

export interface IUpdateSubTodoDto {
  content: string;
}

export interface IUpdateTodoStatusDto {
  status: TodoStatus;
}
