import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import {
  Footer, Header, Main, Meta
} from '@/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/types/site.types';
import { getColor } from '@/utils/getColor';
import { getStorage, removeStorage } from '@/utils/storage';
import { IUser } from '@/types/entity.typs';
import { getCookie, removeCookie } from '@/utils/cookie';
import { setExp, setUser } from '@/reducers/auth.reducer';
import { AppDispatch, RootState } from '@/store';
import { useActivityCheck, useRefresh } from '@/hooks/queries';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const color = getColor();

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: isLoggedIn, } = useActivityCheck(user?.id);
  const dispatch = useDispatch<AppDispatch>();

  const qc = useQueryClient();
  const tokenExp = getCookie<number>('tokenExp');

  const { refetch, } = useRefresh(tokenExp);

  useEffect(() => {
    const isExpired = () => {
      const tokenExp = getCookie<number>('tokenExp');
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
  }, [ tokenExp, ]);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev && isLoggedIn) {
      const user = getStorage<IUser>('user');
      const tokenExp = getCookie<number>('tokenExp');

      if (user) {
        dispatch(setUser({
          user,
        }));
      }

      if (tokenExp) {
        dispatch(setExp({
          tokenExp,
        }));
      }
    } else {
      removeCookie('tokenExp');
      removeStorage('user');
    }
  }, [ isLoggedIn, ]);

  const { asPath, } = useRouter();

  const meta: IMetaData = {
    title,
    url: asPath,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };

  const style = {
    global: css([
      '@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css)',
      '@import url(https://fonts.cdnfonts.com/css/cascadia-code)',
      tw` [*]:( box-border p-0 m-0 font-sans ) `,
      (css`
        body {
          max-width: 700px;
          margin: 0 auto;

          & > div#__next {
            background-color: ${color.blue[50]};
            padding: 1.25rem;
          }
        }
      `),
    ]),
  };

  return (
    <>
      <Global styles={style.global} />
      <Meta meta={meta} />

      <Header />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={4000}
        pauseOnFocusLoss={false}
      />
    </>
  );
}
