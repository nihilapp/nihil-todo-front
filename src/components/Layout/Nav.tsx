import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Page } from '../Base';

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
        <Page href='/'>투두리스트</Page>
      </nav>
    </>
  );
}
