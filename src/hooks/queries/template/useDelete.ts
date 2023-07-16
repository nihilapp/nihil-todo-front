import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IDeleteType, IMutationParameter } from '@/types/queries.types';
import { apiDelete } from '@/utils/axios';

export const useDelete = <T>(input: IMutationParameter): IDeleteType<T> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError>(
    async () => {
      const { data, } = await apiDelete<T>(input.api);

      return data;
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
