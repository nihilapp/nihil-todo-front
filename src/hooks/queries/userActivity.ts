import { usePost } from './template';
import { IUserIdDto } from '@/types/dto.types';

export const useUserActivity = () => usePost<boolean, IUserIdDto>({
  api: '/user-activity',
});

// export const useActivityCheck = (userId: number) => {
//   const {
//     data = false, isLoading, isError, error, isSuccess, refetch,
//   } = useQuery<boolean, AxiosError>(
//     [ 'ActivityCheck', userId, ],
//     async () => {
//       console.log('userId >> ', userId);
//       const { data, } = await apiGet<boolean>(`/user-activity/${userId}`);

//       return data;
//     },
//     {
//       enabled: !!userId,
//     }
//   );

//   return {
//     data: data as boolean,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//     refetch,
//   };
// };
