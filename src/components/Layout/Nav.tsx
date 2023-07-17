import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Page } from '../Base';

interface Props {
  styles?: TwStyle | SerializedStyles;
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
        <Page href='/' icon='tabler:list-check'>투두 매니저</Page>
      </nav>
    </>
  );
}
