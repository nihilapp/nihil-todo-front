import { queryKeys } from '@/data/query-key.data';
import {
  useDelete, useGetAll, useGetByAny, useGetById, usePatch, usePost
} from './template';
import { ISubTodo, TodoStatus } from '@/types/entity.typs';
import { ICreateSubTodoDto, IUpdateSubTodoDto, IUpdateTodoStatusDto } from '@/types/dto.types';

export const useSubTodos = (todoId: number) => useGetAll<ISubTodo[]>({
  key: queryKeys.subTodos.all(todoId),
  api: `/sub-todos/todo/${todoId}`,
});

export const useSubTodoById = (id: number) => useGetById<ISubTodo>({
  key: queryKeys.subTodos.byId(id),
  api: `/sub-todos/${id}`,
});

export const useSubTodoByUserId = (userId: number) => useGetByAny<ISubTodo[]>({
  key: queryKeys.subTodos.byUserId(userId),
  api: `/sub-todos/user/${userId}`,
});

export const useSubTodoByStatus = (status: TodoStatus) => useGetByAny<ISubTodo[]>({
  key: queryKeys.subTodos.byStatus(status),
  api: `/sub-todos/status/${status}`,
});

export const useCreateSubTodo = () => usePost<ISubTodo, ICreateSubTodoDto>({
  api: `/sub-todos`,
});

export const useUpdateSubTodo = (id: number) => usePatch<ISubTodo, IUpdateSubTodoDto>({
  api: `/sub-todos/${id}`,
});

export const useUpdateSubTodoStatus = (id: number) => usePatch<ISubTodo, IUpdateTodoStatusDto>({
  api: `/sub-todos/${id}/status`,
});

export const useDeleteSubTodo = (id: number) => useDelete<ISubTodo>({
  api: `/sub-todos/${id}`,
});
