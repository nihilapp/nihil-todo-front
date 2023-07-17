import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { textStyle } from '@/styles/text.style';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Footer({ styles, }: Props) {
  const nowYear = new Date().getFullYear();
  const startYear = 2023;
  const year = nowYear > startYear ? `${startYear}-${nowYear}` : startYear;

  const style = {
    default: css([
      tw` text-black-base `,
      styles,
      textStyle.size,
    ]),
    copy: css([
      tw` flex flex-row gap-1 items-center justify-center mb-2 `,
    ]),
    links: css([
      tw` flex flex-row gap-2 items-center justify-center `,
      tw` [a]:( p-2 bg-black-500 rounded-[50%] text-white transition-[background-color] duration-[.3s] ) `,
      tw` [a:hover]:( bg-blue-500 ) `,
    ]),
  };

  return (
    <>
      <footer css={style.default}>
        <div css={style.copy}>
          <Icon icon='ph:copyright-bold' />
          <span>{year}.</span>
          <span>NIHILncunia.</span>
        </div>
        <div css={style.links}>
          <a
            href='https://www.instagram.com/nihil_illust/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='instagram'
          >
            <Icon icon='mdi:instagram' fontSize='2rem' />
          </a>
          <a
            href='https://github.com/NIHILncunia'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='github'
          >
            <Icon icon='mdi:github' fontSize='2rem' />
          </a>
        </div>
      </footer>
    </>
  );
}
