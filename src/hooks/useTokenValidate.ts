import {
  QueryClient, QueryObserverResult, RefetchOptions, RefetchQueryFilters
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

// eslint-disable-next-line no-unused-vars
type Refetch<T> = <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<T, AxiosError<unknown, any>>>

export const useTokenValidate = <T> (tokenExp: number, qc: QueryClient, refetch: Refetch<T>) => {
  const isExpired = () => {
    return tokenExp ? Date.now() > tokenExp * 1000 : false;
  };

  if (!isExpired()) {
    return;
  }

  console.log('토큰의 유효성을 검사합니다.');

  if (isExpired()) {
    console.log('토큰이 만료되어 재발급합니다.');
    refetch();
    qc.invalidateQueries();
    console.log('재발급 완료');
  }
};
