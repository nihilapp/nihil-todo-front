import React, { useCallback, useState } from 'react';
import tw, { css } from 'twin.macro';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useSignUp } from '@/hooks/queries';
import { useInput } from '@/hooks';
import { AppLayout } from '@/layouts';

export default function SignUpPage() {
  const [ isComplete, setIsComplete, ] = useState(false);

  const qc = useQueryClient();
  const signUp = useSignUp();

  const email = useInput<HTMLInputElement>('email');
  const userName = useInput<HTMLInputElement>('user-name');
  const password = useInput<HTMLInputElement>('password');
  const passwordConfirm = useInput<HTMLInputElement>('password-confirm');

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (
        email.data.value
        && userName.data.value
        && password.data.value
        && passwordConfirm.data.value
      ) {
        signUp.mutate({
          email: email.data.value,
          userName: userName.data.value,
          password: password.data.value,
        }, {
          onSuccess(result) {
            qc.invalidateQueries();

            setIsComplete(true);
            toast.success(result.message);
          },
          onError(error) {
            console.error(error);
            toast.error(error.message);
          },
        });
      }
    },
    [ email, userName, password, passwordConfirm, signUp, ]
  );

  const style = {
    default: css([
      tw`  `,
    ]),
    input: css([
      tw` border border-black-base/20 p-2 `,
    ]),
  };

  return (
    <>
      <AppLayout title='회원가입'>
        <div css={style.default}>
          {isComplete ? (
            <>
              <Link href='/auth/signin'>로그인하러 가기</Link>
            </>
          ) : (
            <form onSubmit={onSubmitForm}>
              <label htmlFor='email'>
                <input
                  type='email'
                  {...email.data}
                  placeholder='이메일'
                  css={style.input}
                />
              </label>
              <label htmlFor='user-name'>
                <input
                  type='text'
                  {...userName.data}
                  placeholder='별명'
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
              <label htmlFor='password-confirm'>
                <input
                  type='password'
                  autoComplete='false'
                  {...passwordConfirm.data}
                  css={style.input}
                />
              </label>
              <button>회원가입</button>
            </form>
          )}
        </div>
      </AppLayout>
    </>
  );
}
