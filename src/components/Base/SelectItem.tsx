import React, { useCallback, useContext } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { ICheckSelectData, ISelectContextValue } from '@/types/other.type';
import { SelectContext } from '@/context/selectbox.context';

interface Props {
  item: ICheckSelectData;
  styles?: TwStyle | SerializedStyles;
}

export function SelectItem({ item, styles, }: Props) {
  const context = useContext<ISelectContextValue>(SelectContext);
  const { selectItem, isSelect, } = context;

  const onClickSelect = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      selectItem({
        label: event.currentTarget.textContent,
        value: event.currentTarget.dataset.value,
      });
    },
    [ item, ]
  );

  const style = {
    default: css([
      tw` cursor-pointer bg-black-50 w-full p-1 text-black-base hover:bg-blue-300 nth-last-1:rounded-b-1 `,
      isSelect(item.value) && tw` bg-blue-200 hover:bg-blue-300 `,
      styles,
    ]),
  };

  return (
    <>
      <div
        css={style.default}
        data-value={item.value}
        onClick={onClickSelect}
      >
        {item.label}
      </div>
    </>
  );
}
