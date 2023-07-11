import { queryKeys } from '@/data/query-key.data';
import { useGetAll, useGetAny, useGetById } from './template';
import { ITodo, TodoStatus } from '@/types/entity.typs';

export const useGetTodos = () => useGetAll<ITodo[]>({
  key: queryKeys.todos.all,
  api: '/todos',
});

export const useGetTodoById = (id: number) => useGetById<ITodo>({
  key: queryKeys.todos.byId(id),
  api: `/todos/${id}`,
});

export const useGetTodoByUserId = (userId: number) => useGetAny<ITodo[]>({
  key: queryKeys.todos.byUserId(userId),
  api: `/todos/user/${userId}`,
});

export const useGetTodoByStatus = (status: TodoStatus) => useGetAny<ITodo[]>({
  key: queryKeys.todos.byStatus(status),
  api: `/todos/status/${status}`,
});
