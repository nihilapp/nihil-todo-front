import React, { useCallback, useState } from 'react';
import tw, { css } from 'twin.macro';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { useSignUp } from '@/hooks/queries';
import { useInput } from '@/hooks';
import { AppLayout } from '@/layouts';
import { AppDispatch } from '@/store';
import { setSignUpComplete } from '@/reducers/auth.reducer';
import { textStyle } from '@/styles/text.style';
import { PageTitle } from '@/components/Base';

export default function SignUpPage() {
  const [ isValid, setIsValid, ] = useState(true);
  const [ passConErrorMessage, setPassConErrorMessage, ] = useState('');

  const qc = useQueryClient();
  const signUp = useSignUp();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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
          onSuccess() {
            qc.invalidateQueries();

            dispatch(setSignUpComplete({
              signUpComplete: true,
            }));

            router.push('/');
          },
        });
      }
    },
    [ email, userName, password, passwordConfirm, signUp, ]
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, } = event.target;

      const isNumber = (/[0-9]/g).test(value);
      const isLower = (/[a-z]/g).test(value);
      const isUpper = (/[A-Z]/g).test(value);

      if (isNumber && isLower && isUpper && value.length >= 8) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      if (value !== passwordConfirm.data.value) {
        setPassConErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      } else {
        setPassConErrorMessage('');
      }

      password.setValue(value);
    },
    [ passwordConfirm, ]
  );

  const onChangePasswordConfirm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, } = event.target;

      if (value !== password.data.value) {
        setPassConErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      } else {
        setPassConErrorMessage('');
      }

      passwordConfirm.setValue(value);
    },
    [ password, ]
  );

  const style = {
    default: css([
      tw` py-10 w-[80%] mx-auto `,
      textStyle.size,
    ]),
    input: css([
      tw` border border-black-base/20 p-2 rounded-1 text-center outline-none w-full `,
      tw` transition-[border-color] duration-[.3s] `,
      tw` focus:( border-blue-400 ) `,
    ]),
    label: css([
      tw` mb-5 block `,
      tw` [span]:( mb-1 flex flex-row gap-1 items-center text-black-base ) `,
    ]),
    error: css([
      tw` text-red-500 mt-2 font-700 flex flex-row items-center gap-1 `,
      tw` [svg]:( basis-[30px] shrink-0 ) `,
    ]),
    button: css([
      tw` p-2 bg-blue-400 mx-auto rounded-1 text-white outline-none font-700 w-full `,
      tw` transition-[background-color] duration-[.3s] `,
      tw` hover:( bg-blue-500 ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='회원가입'>
        <div css={style.default}>
          <PageTitle styles={tw`mb-5`}>회원가입</PageTitle>
          <form onSubmit={onSubmitForm}>
            <label htmlFor='email' css={style.label}>
              <span><Icon icon='gg:shape-rhombus' />이메일</span>
              <input
                type='email'
                autoComplete='off'
                required
                {...email.data}
                css={style.input}
              />
            </label>
            <label htmlFor='user-name' css={style.label}>
              <span><Icon icon='gg:shape-rhombus' />닉네임</span>
              <input
                type='text'
                autoComplete='off'
                required
                {...userName.data}
                css={style.input}
              />
            </label>
            <label htmlFor='password' css={style.label}>
              <span><Icon icon='gg:shape-rhombus' />비밀번호</span>
              <input
                type='password'
                autoComplete='off'
                required
                {...password.data}
                onChange={onChangePassword}
                css={style.input}
              />
            </label>
            <label htmlFor='password-confirm' css={style.label}>
              <span><Icon icon='gg:shape-rhombus' />비밀번호 확인</span>
              <input
                type='password'
                autoComplete='off'
                required
                {...passwordConfirm.data}
                onChange={onChangePasswordConfirm}
                css={style.input}
              />
              {passConErrorMessage && (
                <p css={style.error}><Icon icon='typcn:times' />{passConErrorMessage}</p>
              )}
              {!isValid && (
                <p css={style.error}><Icon icon='typcn:times' />비밀번호는 8~20자의 숫자, 알파벳 대소문자를 모두 포함해야합니다.</p>
              )}
            </label>
            <button css={style.button}>회원가입</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
