import React, { useCallback, useMemo, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { ICheckSelectData } from '@/types/other.type';
import { textStyle } from '@/styles/text.style';
import { SelectContext } from '@/context/selectbox.context';
import { SelectList } from './SelectList';

interface Props {
  data?: ICheckSelectData[];
  item: ICheckSelectData;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: ICheckSelectData) => void;
  styles?: TwStyle | SerializedStyles;
}

export function Select({
  data = [], item, disabled, onChange, styles,
}: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);

  console.log('item >> ', item);

  const selectItem = useCallback(
    (value: ICheckSelectData) => {
      onChange(value);
    },
    []
  );

  const memoizedValue = useMemo(() => ({
    selectItem,
  }), [ selectItem, ]);

  const onClickOpen = useCallback(
    () => {
      setIsOpen((prev) => !prev);
    },
    []
  );

  const style = {
    default: css([
      tw`  `,
      styles,
      textStyle.size,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div>
          <div>{item?.label || '- 선택 -'}</div>
          <button onClick={onClickOpen}>
            {isOpen ? (
              <Icon icon='mingcute:down-fill' />
            ) : (
              <Icon icon='mingcute:up-fill' />
            )}
          </button>
        </div>
        <SelectContext.Provider value={memoizedValue}>
          <SelectList data={data} />
        </SelectContext.Provider>
      </div>
    </>
  );
}
