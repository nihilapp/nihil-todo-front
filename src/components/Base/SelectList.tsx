import React, { useContext } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import { ICheckSelectData, ISelectContextValue } from '@/types/other.type';
import { SelectContext } from '@/context/selectbox.context';

interface Props {
  data: ICheckSelectData[];
  styles?: TwStyle | SerializedStyles;
}

export function SelectList({ data, styles, }: Props) {
  const context = useContext<ISelectContextValue>(SelectContext);
  const { selectItem, } = context;

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {data.map((item) => (
          <div
            key={uuid()}
            data-value={item.value}
            onClick={(e) => (
              selectItem({
                label: e.currentTarget.textContent,
                value: e.currentTarget.dataset.value,
              })
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
}
