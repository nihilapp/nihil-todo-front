import { TodoStatus } from '@/types/entity.typs';

const auth = {
  me: [ 'getMe', ],
  refresh: [ 'tokenRefresh', ],
};

const users = {
  all: [ 'getUsers', ],
  byId: (id: number) => [ 'getUserById', id, ],
};

const posts = {
  all: [ 'getPosts', ],
  byId: (id: number) => [ 'getPostById', id, ],
  byUserId: (userId: number) => [ 'getPostByUserId', userId, ],
};

const postImages = {
  byPostId: (postId: number) => [ 'getPostImageByPostId', postId, ],
};

const withdrawal = {
  all: [ 'getWithdawals', ],
};

const todos = {
  all: [ 'getTodos', ],
  byId: (id: number) => [ 'getTodoById', id, ],
  byUserId: (userId: number) => [ 'getTodoByUserId', userId, ],
  byStatus: (status: TodoStatus) => [ 'getTodoByStatus', status, ],
};

const subTodos = {
  all: (todoId: number) => [ 'getSubTodos', todoId, ],
  byId: (id: number) => [ 'getSubTodoById', id, ],
  byUserId: (userId: number) => [ 'getSubTodoByUserId', userId, ],
  byStatus: (status: TodoStatus) => [ 'getSubTodoByStatus', status, ],
};

export const queryKeys = {
  auth,
  users,
  posts,
  postImages,
  withdrawal,
  todos,
  subTodos,
};
