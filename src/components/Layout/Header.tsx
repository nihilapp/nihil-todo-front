import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Nav } from './Nav';
import { UserNav } from './UserNav';

interface Props {
  styles?: SerializedStyles;
}

export function Header({ styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <header css={style.default}>
        <h1>이름</h1>
        <div>
          <Nav />
          <UserNav />
        </div>
      </header>
    </>
  );
}
