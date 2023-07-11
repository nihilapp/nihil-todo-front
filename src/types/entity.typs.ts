const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const UserStatus = {
  WITHDRAW: 'WITHDRAW',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

const TodoStatus = {
  ADDED: 'ADDED',
  PROGRESS: 'PROGRESS',
  DONE: 'DONE',
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

export interface IUser {
  id?: number;
  email: string;
  userName: string;
  role?: UserRole;
  status?: UserStatus;
  created?: string;
  updated?: string;
  UserAuth?: IUserAuth[];
  UserToken?: IUserToken[];
  Withdrawal?: IWithdrawal[];
  Todos?: ITodo[];
  SubTodos?: ISubTodo[];
}

export interface IUserAuth {
  id?: number;
  userId: number;
  hashedPassword: string;
  User?: IUser;
}

export interface IUserToken {
  id?: number;
  userId: number;
  hashedRefreshToken: string;
  User?: IUser;
}

export interface IWithdrawal {
  id?: number;
  userId: number;
  text?: string;
  created?: string;
  User?: IUser;
}

export interface ITodo {
  id?: number;
  userId?: number;
  status?: TodoStatus;
  created?: string;
  SubTodos?: ISubTodo[];
  content?: string;
  User?: IUser;
}

export interface ISubTodo {
  id?: number;
  userId?: number;
  todoId?: number;
  status?: TodoStatus;
  created?: string;
  content?: string;
  Todos?: ITodo;
  User?: IUser;
}
