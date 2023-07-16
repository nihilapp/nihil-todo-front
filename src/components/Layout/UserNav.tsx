import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Page } from '../Base';
import { useSignOut } from '@/hooks/queries';
import { AppDispatch, RootState } from '@/store';
import { setExp, setUser } from '@/reducers/auth.reducer';
import { removeStorage } from '@/utils/storage';
import { removeCookie } from '@/utils/cookie';

interface Props {
  styles?: SerializedStyles;
}

export function UserNav({ styles, }: Props) {
  const { user, } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const signOut = useSignOut();

  const onClickSignOut = useCallback(() => {
    signOut.mutate({}, {
      onSuccess() {
        removeStorage('user');
        dispatch(setUser({
          user: null,
        }));

        removeCookie('tokenExp');
        dispatch(setExp({
          tokenExp: 0,
        }));
      },
    });

    toast.success('성공적으로 로그아웃 되었습니다.');
  }, [ signOut, user, ]);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        {user !== null ? (
          <>
            <Page href='/me'>마이페이지</Page>
            <button onClick={onClickSignOut}>로그아웃</button>
          </>
        ) : (
          <>
            <Page href='/auth/signup'>회원가입</Page>
            <Page href='/auth/signin'>로그인</Page>
          </>
        )}
      </nav>
    </>
  );
}
