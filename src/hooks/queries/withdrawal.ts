import { IWithdrawal } from '@/types/entity.typs';
import { useGetAll, usePost } from './template';
import { queryKeys } from '@/data/query-key.data';
import { ICreateWithdrawalDto } from '@/types/dto.types';

export const useWithdwarals = () => useGetAll<IWithdrawal[]>({
  key: queryKeys.withdrawal.all,
  api: '/withdrawals',
});

export const useCreateWithdrawal = () => usePost<IWithdrawal, ICreateWithdrawalDto>({
  api: '/withdrawals',
});
