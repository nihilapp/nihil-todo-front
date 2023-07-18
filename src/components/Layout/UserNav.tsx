import React, { useCallback } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { Page } from '../Base';
import { useSignOut } from '@/hooks/queries';
import { AppDispatch, RootState } from '@/store';
import { setExp, setUser } from '@/reducers/auth.reducer';
import { removeStorage } from '@/utils/storage';
import { removeCookie } from '@/utils/cookie';

interface Props {
  styles?: TwStyle | SerializedStyles;
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
      tw` flex flex-row gap-2 `,
      styles,
    ]),
    button: css([
      tw` text-black-base p-1 px-2 bg-blue-100 rounded-1 border border-blue-100 text-[90%] `,
      tw` hover:( bg-white text-blue-500 border-blue-500 ) `,
      (css`
        transition: all .3s ease-in-out;
      `),
      tw` inline-flex flex-row gap-1 items-center `,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        {user !== null ? (
          <>
            <Page href='/me' icon='ant-design:user-outlined'>마이페이지</Page>
            <button onClick={onClickSignOut} css={style.button}>
              <Icon icon='majesticons:logout-line' fontSize='1.2rem' /> 로그아웃
            </button>
          </>
        ) : (
          <>
            <Page href='/auth/signup' icon='ant-design:user-add-outlined'>회원가입</Page>
            <Page href='/auth/signin' icon='majesticons:login-line'>로그인</Page>
          </>
        )}
      </nav>
    </>
  );
}
