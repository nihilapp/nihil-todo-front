import { IUser } from '@/types/entity.typs';
import { useGetAll, useGetById, usePatch } from './template';
import { queryKeys } from '@/data/query-key.data';
import { IUpdateUserDto } from '@/types/dto.types';

export const useUsers = () => useGetAll<IUser[]>({
  key: queryKeys.users.all,
  api: '/users',
});

export const useUserById = (id: number) => useGetById<IUser>({
  key: queryKeys.users.byId(id),
  api: `/users/${id}}`,
});

export const useUpdateUser = (id: number) => usePatch<IUser, IUpdateUserDto>({
  api: `/users/${id}`,
});
