import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import { ICheckSelectData } from '@/types/other.type';
import { SelectItem } from './SelectItem';

interface Props {
  data: ICheckSelectData[];
  isOpen: boolean;
  styles?: TwStyle | SerializedStyles;
}

export function SelectList({ data, isOpen, styles, }: Props) {
  const style = {
    default: css([
      tw` w-full absolute opacity-0 border border-blue-400 border-t-0 z-10 rounded-b-1 `,
      (css`
        transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
        transform-origin: top;
        &.select-show {
          ${tw` opacity-100 transform scale-y-100 `}
        }

        &.select-hidden {
          ${tw` transform scale-y-0 `}
        }
      `),
      styles,
    ]),
  };

  return (
    <>
      <div className={isOpen ? 'select-show' : 'select-hidden'} css={style.default}>
        {data.map((item) => (
          <SelectItem key={uuid()} item={item} />
        ))}
      </div>
    </>
  );
}
