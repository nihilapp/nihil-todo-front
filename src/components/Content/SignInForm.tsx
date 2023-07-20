import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useInput } from '@/hooks';
import { useSignIn } from '@/hooks/queries';
import { dateAddHour } from '@/utils/date';
import { setStorage } from '@/utils/storage';
import { setCookie } from '@/utils/cookie';
import { AppDispatch } from '@/store';
import { setExp, setUser } from '@/reducers/auth.reducer';
import { textStyle } from '@/styles/text.style';
import { IErrorMessage } from '@/types/axios.type';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function SignInForm({ styles, }: Props) {
  const [ isError, setIsError, ] = useState(false);
  const [ errorMessage, setErrorMessage, ] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const qc = useQueryClient();
  const email = useInput<HTMLInputElement>('email');
  const password = useInput<HTMLInputElement>('password');

  const signIn = useSignIn();

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!(email.data.value && password.data.value)) {
        setIsError(true);
        setErrorMessage('이메일과 비밀번호를 입력해야합니다.');
        return;
      }

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

          setIsError(false);
          setErrorMessage('');

          toast.success('성공적으로 로그인 되었습니다.');
        },
        onError(error: AxiosError<IErrorMessage>) {
          setIsError(true);
          setErrorMessage(error.response.data.message);
        },
      });
    },
    [ email, password, signIn, ]
  );
  const style = {
    default: css([
      tw` flex flex-col gap-2 `,
      styles,
      textStyle.size,
    ]),
    input: css([
      tw` border border-black-base/20 p-2 rounded-1 text-center outline-none w-full `,
      tw` transition-[border-color] duration-[.3s] `,
      tw` focus:( border-blue-400 ) `,
    ]),
    label: css([
      tw` block mb-5 `,
    ]),
    button: css([
      tw` p-2 bg-blue-400 mx-auto rounded-1 text-white outline-none font-700 w-full `,
      tw` transition-[background-color] duration-[.3s] `,
      tw` hover:( bg-blue-500 ) `,
    ]),
    errorMessage: css([
      tw` text-red-500 mt-2 font-700 `,
    ]),
  };

  return (
    <>
      <form onSubmit={onSubmitForm} css={style.default}>
        <label htmlFor='email'>
          <input
            type='text'
            autoComplete='off'
            {...email.data}
            css={style.input}
          />
        </label>
        <label htmlFor='password' css={style.label}>
          <input
            type='password'
            autoComplete='off'
            {...password.data}
            css={style.input}
          />
          {isError && (
            <p css={style.errorMessage}>{errorMessage}</p>
          )}
        </label>
        <button css={style.button}>로그인</button>
      </form>
    </>
  );
}
