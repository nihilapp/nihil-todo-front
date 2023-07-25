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
import { useUpdateSubTodoStatus, useUpdateTodoStatus } from '@/hooks/queries';

interface Props {
  data?: ICheckSelectData[];
  item: ICheckSelectData;
  disabled?: boolean;
  mode: ('main' | 'sub');
  todoId: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: ICheckSelectData) => void;
  styles?: TwStyle | SerializedStyles;
}

export function Select({
  data = [], item, disabled: groupDisabled, mode, todoId, onChange, styles,
}: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const qc = useQueryClient();
  const updateTodoStatus = useUpdateTodoStatus(todoId);
  const updateSubTodoStatus = useUpdateSubTodoStatus(todoId);

  const selectItem = useCallback(
    (data: ICheckSelectData) => {
      onChange(data);
      if (mode === 'main') {
        updateTodoStatus.mutate({
          status: data.value,
        }, {
          onSuccess() {
            qc.invalidateQueries();
            buttonRef.current.click();
            toast.success(`상태를 '${data.label}'으로 변경했습니다.`);
          },
        });
      } else {
        updateSubTodoStatus.mutate({
          status: data.value,
        }, {
          onSuccess() {
            qc.invalidateQueries();
            buttonRef.current.click();
            toast.success(`상태를 '${data.label}'으로 변경했습니다.`);
          },
        });
      }
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
      tw` [div]:( flex-1 shrink-0 p-2 py-1 border [&.label-enabled]:( border-blue-400 bg-white text-blue-400 ) [&.label-disabled]:( border-black-200 bg-black-50 text-black-400 ) ) `,
      tw` [button]:( p-2 py-1 [&.button-enabled]:( bg-blue-400 text-white hover:bg-blue-500 transition-[background-color] duration-[.3s] ) [&.button-disabled]:( bg-black-200 text-black-400 cursor-not-allowed ) ) `,
      (css`
        div {
          border-top-left-radius: 4px;
          border-bottom-left-radius: ${isOpen ? '0' : '4px'};

          &.label-enabled {
            ${mode === 'main' ? tw` text-blue-400 border-blue-400 ` : tw` text-blue-500 border-blue-500 `};
          }

          &.label-disabled {
            ${mode === 'main' ? tw` bg-black-50 border-black-200 text-black-400 ` : tw` bg-black-100 border-black-300 text-black-500 `};
          }
        }

        button {
          border-top-right-radius: 4px;
          border-bottom-right-radius: ${isOpen ? '0' : '4px'};

          &.button-enabled {
            ${mode === 'main' ? tw` bg-blue-400 ` : tw` bg-blue-500 `};
          }

          &.button-disabled {
            ${mode === 'main' ? tw` bg-black-200 text-black-400 ` : tw` bg-black-300 text-black-500 `};
          }
        }
      `),
    ]),
  };

  console.log('isOpen >> ', isOpen);

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
