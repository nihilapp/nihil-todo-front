import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '@/hooks';
import { useSignIn } from '@/hooks/queries';
import { dateAddHour } from '@/utils/date';
import { setStorage } from '@/utils/storage';
import { setCookie } from '@/utils/cookie';
import { AppDispatch } from '@/store';
import { setExp, setUser } from '@/reducers/auth.reducer';

interface Props {
  styles?: SerializedStyles;
}

export function SignInForm({ styles, }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const qc = useQueryClient();
  const email = useInput<HTMLInputElement>('email');
  const password = useInput<HTMLInputElement>('password');

  const signIn = useSignIn();

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      signIn.mutate({
        email: email.data.value,
        password: password.data.value,
      }, {
        onSuccess(result) {
          qc.invalidateQueries();

          setStorage('user', result.user);
          dispatch(setUser({
            user: result.user,
          }));

          setCookie('tokenExp', result.tokenExp, {
            path: '/',
            expires: dateAddHour(2),
          });
          dispatch(setExp({
            tokenExp: result.tokenExp,
          }));

          email.setValue('');
          password.setValue('');

          toast.success('성공적으로 로그인 되었습니다.');
        },
      });
    },
    [ email, password, signIn, ]
  );
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    input: css([
      tw` border border-black-base/20 p-2 `,
    ]),
  };

  return (
    <>
      <form onSubmit={onSubmitForm} css={style.default}>
        <label htmlFor='email'>
          <input
            type='text'
            {...email.data}
            css={style.input}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            autoComplete='false'
            {...password.data}
            css={style.input}
          />
        </label>
        <button>로그인</button>
      </form>
    </>
  );
}
