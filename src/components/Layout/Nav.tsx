import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  styles?: SerializedStyles;
}

export function Nav({ styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        <Link href='/'>홈</Link>
        <Link href='/test'>테스트</Link>
      </nav>
    </>
  );
}
