import React, {
  useCallback, useMemo, useRef, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { ICheckSelectData } from '@/types/other.type';
import { textStyle } from '@/styles/text.style';
import { SelectContext } from '@/context/selectbox.context';
import { SelectList } from './SelectList';
import { useUpdateTodoStatus } from '@/hooks/queries';

interface Props {
  data?: ICheckSelectData[];
  item: ICheckSelectData;
  disabled?: boolean;
  todoId: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: ICheckSelectData) => void;
  styles?: TwStyle | SerializedStyles;
}

export function Select({
  data = [], item, disabled: groupDisabled, todoId, onChange, styles,
}: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const qc = useQueryClient();
  const updateTodoStatus = useUpdateTodoStatus(todoId);

  const selectItem = useCallback(
    (data: ICheckSelectData) => {
      onChange(data);
      updateTodoStatus.mutate({
        status: data.value,
      }, {
        onSuccess() {
          qc.invalidateQueries();
          buttonRef.current.click();
          toast.success(`상태를 '${data.label}'으로 변경했습니다.`);
        },
      });
    },
    [ updateTodoStatus, ]
  );

  const isDisabled = (disabled: boolean) => (disabled || groupDisabled);

  const isSelect = useCallback(
    (value: string) => {
      return item.value === value;
    },
    [ item, ]
  );

  const memoizedValue = useMemo(() => ({
    selectItem, isSelect, isDisabled,
  }), [ selectItem, isSelect, isDisabled, ]);

  const onClickOpen = useCallback(
    () => {
      setIsOpen((prev) => !prev);
    },
    []
  );

  const style = {
    default: css([
      tw` w-[200px] relative `,
      styles,
      textStyle.size,
    ]),
    top: css([
      tw` flex flex-row items-stretch `,
      tw` [div]:( flex-1 shrink-0 p-2 py-1 border rounded-l-1 [&.label-enabled]:( border-blue-500/50 bg-blue-100 ) [&.label-disabled]:( border-black-200 bg-black-50 text-black-400 ) ) `,
      tw` [button]:( [&.button-enabled]:( p-2 py-1 rounded-r-1 bg-blue-400 text-white hover:bg-blue-500 transition-[background-color] duration-[.3s] ) [&.button-disabled]:( rounded-r-1 p-2 py-1 bg-black-200 text-black-400 cursor-not-allowed ) ) `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.top}>
          {groupDisabled ? (
            <div className='label-disabled'>{item?.label || '- 선택 -'}</div>
          ) : (
            <div className='label-enabled'>{item?.label || '- 선택 -'}</div>
          )}
          {groupDisabled ? (
            <button className='button-disabled'>
              <Icon icon='mingcute:down-fill' />
            </button>
          ) : (
            <button className='button-enabled' onClick={onClickOpen} ref={buttonRef}>
              {isOpen ? (
                <Icon icon='mingcute:up-fill' />
              ) : (
                <Icon icon='mingcute:down-fill' />
              )}
            </button>
          )}
        </div>
        <SelectContext.Provider value={memoizedValue}>
          <SelectList
            data={data}
            isOpen={isOpen}
          />
        </SelectContext.Provider>
      </div>
    </>
  );
}
