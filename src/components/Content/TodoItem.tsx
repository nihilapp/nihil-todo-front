import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { ITodo } from '@/types/entity.typs';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/queries';
import { SubTodoInput } from './SubTodoInput';
import { SubTodoList } from './SubTodoList';
import { setDate } from '@/utils/date';
import { Select } from '../Base';
import { todoStatusData } from '@/data/select.data';
import { ICheckSelectData } from '@/types/other.type';
import { textStyle } from '@/styles/text.style';

interface Props {
  todo: ITodo;
  styles?: TwStyle | SerializedStyles;
}

const status = {
  ADDED: '대기중',
  PROGRESS: '진행중',
  DONE: '완료',
};

export function TodoItem({ todo, styles, }: Props) {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ isShowSubTodos, setIsShowSubTodos, ] = useState(false);
  const [ content, setContent, ] = useState(todo.content);
  const [ selectedStatus, setSelectedStatus, ] = useState<ICheckSelectData>({
    label: status[todo.status],
    value: todo.status,
  });

  const qc = useQueryClient();
  const updateTodo = useUpdateTodo(todo.id);
  const deleteTodo = useDeleteTodo(todo.id);

  const onChangeTodo = useCallback(
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

  const onClickOpen = useCallback(() => {
    setIsShowSubTodos((prev) => !prev);
  }, []);

  const style = {
    default: css([
      tw` mb-5 nth-last-1:mb-0 text-black-base p-3 rounded-1 bg-white border border-black-100 shadow-sm shadow-black-300 `,
      styles,
      textStyle.size,
    ]),
    top: css([
      tw` flex flex-row justify-between items-center mb-2 `,
    ]),
    middle: css([
      tw` flex flex-row gap-2 `,
      tw` [&>div]:( flex-1 shrink-0 ) `,
      tw` [input]:( w-full p-2 outline-none rounded-1 bg-white border border-blue-400 read-only:( bg-blue-100 border-transparent border-none ) ) `,
      tw` [button]:( p-2 border border-blue-400 bg-white text-blue-400 rounded-1 transition-all duration-[.3s] hover:( border-blue-500 text-white bg-blue-500 ) ) `,
    ]),
    bottom: css([
      tw` flex items-center justify-center mt-2 `,
      tw` [button]:( p-2 py-1 flex-1 shrink-0 rounded-1 flex items-center justify-center bg-blue-100 text-blue-600 transition-all duration-[.3s] hover:( bg-blue-200 ) ) `,
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
            mode='main'
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
              onChange={onChangeTodo}
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
        <div css={style.bottom}>
          <button onClick={onClickOpen}>
            {isShowSubTodos ? (
              <>
                <Icon icon='ep:arrow-up-bold' />
                <span css={textStyle.hidden}>하위 목록 접기</span>
              </>
            ) : (
              <>
                <Icon icon='ep:arrow-down-bold' />
                <span css={textStyle.hidden}>하위 목록 펼치기</span>
              </>
            )}
          </button>
        </div>
        {isShowSubTodos && (
          <>
            <SubTodoInput todo={todo} />
            <SubTodoList todo={todo} />
          </>
        )}
      </div>
    </>
  );
}
