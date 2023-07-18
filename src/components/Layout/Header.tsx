import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Nav } from './Nav';
import { UserNav } from './UserNav';
import todoManagerLogo from '@/images/TodoManager.png';
import { textStyle } from '@/styles/text.style';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Header({ styles, }: Props) {
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
      </header>
    </>
  );
}
