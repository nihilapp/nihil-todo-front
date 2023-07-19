import { useGetAny } from './template';

export const useActivityCheck = (userId: number) => useGetAny<boolean>({
  key: [ 'ActivityCheck', userId, ],
  api: `/user-activity/${userId}`,
  options: {
    enabled: !!userId,
  },
});
