import React, { useCallback } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from './Nav';
import { UserNav } from './UserNav';
import todoManagerLogo from '@/images/TodoManager.png';
import { textStyle } from '@/styles/text.style';
import { AppDispatch, RootState } from '@/store';
import { setExp, setUser } from '@/reducers/auth.reducer';
import { removeCookie } from '@/utils/cookie';
import { removeStorage } from '@/utils/storage';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Header({ styles, }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();

  const onClickButton = useCallback(
    () => {
      dispatch(setUser({
        user: null,
      }));

      dispatch(setExp({
        tokenExp: 0,
      }));

      removeCookie('tokenExp');
      removeStorage('user');
    },
    []
  );

  const style = {
    default: css([
      tw`  `,
      styles,
      textStyle.size,
    ]),
    img: css([
      tw` block mx-auto w-[150px] `,
    ]),
    menu: css([
      tw` flex flex-row items-center `,
    ]),
    button: css([
      tw` block mt-2 w-full p-2 text-center rounded-1 bg-blue-400 hover:bg-blue-500 text-white `,
      tw` duration-[.3s] transition-[background-color] `,
    ]),
  };

  return (
    <>
      <header css={style.default}>
        <h1 tw=' mb-5 border-b border-blue-500/40 pb-5 '>
          <img src={todoManagerLogo.src} alt='투두매니저 로고' css={style.img} />
        </h1>
        <div css={style.menu}>
          <div css={tw` flex-1 shrink-0 `}>
            <Nav />
          </div>
          <UserNav />
        </div>
        {process.env.NODE_ENV === 'development' && user && (
          <button onClick={onClickButton} css={style.button}>로그인 정보 초기화</button>
        )}
      </header>
    </>
  );
}
