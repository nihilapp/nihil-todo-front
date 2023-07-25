import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { ISubTodo } from '@/types/entity.typs';
import { useDeleteSubTodo, useUpdateSubTodo } from '@/hooks/queries';
import { setDate } from '@/utils/date';
import { ICheckSelectData } from '@/types/other.type';
import { textStyle } from '@/styles/text.style';
import { Select } from '../Base';
import { todoStatusData } from '@/data/select.data';

interface Props {
  todo: ISubTodo;
  styles?: TwStyle | SerializedStyles;
}

const status = {
  ADDED: '대기중',
  PROGRESS: '진행중',
  DONE: '완료',
};

export function SubTodoItem({ todo, styles, }: Props) {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ content, setContent, ] = useState(todo.content);
  const [ selectedStatus, setSelectedStatus, ] = useState<ICheckSelectData>({
    label: status[todo.status],
    value: todo.status,
  });

  const qc = useQueryClient();
  const updateTodo = useUpdateSubTodo(todo.id);
  const deleteTodo = useDeleteSubTodo(todo.id);

  const onChangeSubTodo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContent(event.target.value);
    },
    []
  );

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onClickUpdateTodo = useCallback(() => {
    updateTodo.mutate({
      content,
    }, {
      onSuccess() {
        qc.invalidateQueries();
        toast.success('성공적으로 수정되었습니다.');
      },
    });

    setIsEdit(false);
  }, [ content, updateTodo, ]);

  const onClickDeleteTodo = useCallback(() => {
    deleteTodo.mutate({}, {
      onSuccess() {
        qc.invalidateQueries();
        toast.success('성공적으로 삭제되었습니다.');
      },
    });
  }, [ deleteTodo, ]);

  const style = {
    default: css([
      tw` mb-5 nth-last-1:mb-0 text-black-base p-3 rounded-1 bg-blue-200 border border-blue-300 `,
      styles,
    ]),
    top: css([
      tw` flex flex-row justify-between items-center mb-2 `,
    ]),
    middle: css([
      tw` flex flex-row gap-2 `,
      tw` [&>div]:( flex-1 shrink-0 ) `,
      tw` [input]:( w-full p-2 outline-none rounded-1 bg-white border border-blue-400 read-only:( bg-blue-100 border-transparent border-none ) ) `,
      tw` [button]:( p-2 border border-blue-500 bg-white text-blue-500 rounded-1 transition-all duration-[.3s] hover:( border-blue-600 text-white bg-blue-600 ) ) `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.top}>
          <Select
            item={selectedStatus}
            onChange={setSelectedStatus}
            data={todoStatusData}
            todoId={todo.id}
            disabled={isEdit}
            mode='sub'
          />
          <div tw='flex flex-row gap-2 items-center'>
            <Icon icon='zondicons:time' />
            <span>{setDate(todo.created)}</span>
          </div>
        </div>
        <div css={style.middle}>
          <div>
            <input
              type='text'
              placeholder='할 일을 입력하세요'
              readOnly={!isEdit}
              value={content}
              onChange={onChangeSubTodo}
            />
          </div>
          {isEdit ? (
            <button onClick={onClickUpdateTodo}>
              <Icon icon='mingcute:check-fill' />
              <span css={textStyle.hidden}>확인</span>
            </button>
          ) : (
            <>
              <button onClick={onClickEdit}>
                <Icon icon='material-symbols:edit' />
                <span css={textStyle.hidden}>수정</span>
              </button>
              <button onClick={onClickDeleteTodo}>
                <Icon icon='material-symbols:delete' />
                <span css={textStyle.hidden}>삭제</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
