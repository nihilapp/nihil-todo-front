import { queryKeys } from '@/data/query-key.data';
import {
  useDelete,
  useGetAll, useGetByAny, useGetById, usePatch, usePost
} from './template';
import { ITodo, TodoStatus } from '@/types/entity.typs';
import { ICreateTodoDto, IUpdateTodoDto, IUpdateTodoStatusDto } from '@/types/dto.types';

export const useTodos = () => useGetAll<ITodo[]>({
  key: queryKeys.todos.all,
  api: `/todos`,
});

export const useTodoById = (id: number) => useGetById<ITodo>({
  key: queryKeys.todos.byId(id),
  api: `/todos/${id}`,
});

export const useTodoByUserId = (userId: number) => useGetByAny<ITodo[]>({
  key: queryKeys.todos.byUserId(userId),
  api: `/todos/user/${userId}`,
});

export const useTodoByStatus = (status: TodoStatus) => useGetByAny<ITodo[]>({
  key: queryKeys.todos.byStatus(status),
  api: `/todos/status/${status}`,
});

export const useCreateTodo = () => usePost<ITodo, ICreateTodoDto>({
  api: `/todos`,
});

export const useUpdateTodo = (id: number) => usePatch<ITodo, IUpdateTodoDto>({
  api: `/todos/${id}`,
});

export const useUpdateTodoStatus = (id: number) => usePatch<ITodo, IUpdateTodoStatusDto>({
  api: `/todos/${id}/status`,
});

export const useDeleteTodo = (id: number) => useDelete<ITodo>({
  api: `/todos/${id}`,
});
