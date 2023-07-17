import React, { useEffect } from 'react';
import tw, { css } from 'twin.macro';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '@/store';
import { AppLayout } from '@/layouts';
import { setSignUpComplete } from '@/reducers/auth.reducer';
import {
  IsLoading, SignInForm, TodoInput, TodoList
} from '@/components/Content';
import { PageTitle } from '@/components/Base';

export default function IndexPage() {
  const { user, signUpComplete, } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (signUpComplete) {
      toast.success('회원가입이 완료되었습니다. 이제 로그인하세요.');

      dispatch(setSignUpComplete({
        signUpComplete: false,
      }));
    }
  }, [ signUpComplete, ]);

  const style = {
    default: css([
      tw` py-10 `,
    ]),
  };

  return (
    <>
      <AppLayout title='홈'>
        <div css={style.default}>
          {user !== null ? (
            <>
              <TodoInput />
              <TodoList />
              <IsLoading />
            </>
          ) : (
            <div tw='text-center'>
              <PageTitle styles={tw` justify-center `}>사용하려면 로그인하세요</PageTitle>
              <SignInForm />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
}
