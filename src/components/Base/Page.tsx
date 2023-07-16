import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
  styles?: SerializedStyles;
}

export function Page({ href, children, styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <Link href={href} css={style.default}>{children}</Link>
    </>
  );
}
