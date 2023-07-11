import { usePost, useGetAny } from './template';
import { ICreateUserDto, ISignInDto, IUserResDto } from '@/types/dto.types';
import { IUser } from '@/types/entity.typs';
import { queryKeys } from '@/data/query-key.data';
import { setCookie } from '@/utils/cookie';

export const useSignUp = () => usePost<IUserResDto, ICreateUserDto>({
  api: '/auth/signup',
});

export const useSignIn = () => usePost<IUserResDto, ISignInDto>({
  api: '/auth/signin',
});

export const useSignOut = () => usePost<{message: string}, Record<string, never>>({
  api: '/auth/signout',
});

export const useGetMe = () => useGetAny<IUser>({
  key: queryKeys.auth.me,
  api: '/auth/me',
});

export const useRefresh = (exp: number) => useGetAny<IUserResDto>({
  key: queryKeys.auth.refresh,
  api: '/auth/refresh',
  options: {
    enabled: exp !== null && Date.now() > exp * 1000,
    onSuccess: (data) => {
      setCookie('sign', true, {
        expires: new Date(data.tokenExp * 1000),
      });
      setCookie('tokenExp', data.tokenExp, {
        expires: new Date(data.tokenExp * 1000),
      });
    },
  },
});
