import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Props {
  href: string;
  icon?: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Page({
  href, icon, children, styles,
}: Props) {
  const style = {
    default: css([
      tw` text-black-base p-1 px-2 bg-blue-100 rounded-1 `,
      tw` hover:( text-white bg-blue-500 ) `,
      icon && tw` inline-flex flex-row gap-1 items-center `,
      styles,
    ]),
  };

  return (
    <>
      <Link href={href} css={style.default}>
        {icon && <Icon icon={icon} />}
        {children}
      </Link>
    </>
  );
}
