import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: SerializedStyles;
}

export function PageTitle({ children, styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <h2 css={style.default}>{children}</h2>
    </>
  );
}
