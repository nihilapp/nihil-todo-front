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
      tw` py-4 `,
      tw` [>h2]:( p-3 bg-black-700 text-white font-900 text-center text-[2rem] ) `,
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
            <SignInForm />
          )}
        </div>
      </AppLayout>
    </>
  );
}
