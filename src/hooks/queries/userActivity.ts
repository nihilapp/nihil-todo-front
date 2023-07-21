import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiGet } from '@/utils/axios';

export const useActivityCheck = (userId: number) => {
  const {
    data = false, isLoading, isError, error, isSuccess, refetch,
  } = useQuery<boolean, AxiosError>(
    [ 'ActivityCheck', userId, ],
    async () => {
      const { data, } = await apiGet<boolean>(`/user-activity/${userId}`);

      return data;
    },
    {
      enabled: !!userId,
    }
  );

  return {
    data: data as boolean,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
