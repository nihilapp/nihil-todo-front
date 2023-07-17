import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function PageTitle({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` text-[1.4rem] font-700 text-black-base mb-2 flex flex-row items-center `,
      styles,
    ]),
  };

  return (
    <>
      <h2 css={style.default}>
        <Icon icon='eva:arrow-right-fill' /> {children}
      </h2>
    </>
  );
}
