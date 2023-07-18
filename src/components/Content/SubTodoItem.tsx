import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ISubTodo } from '@/types/entity.typs';
import { useDeleteSubTodo, useUpdateSubTodo, useUpdateSubTodoStatus } from '@/hooks/queries';
import { setDate } from '@/utils/date';

interface Props {
  todo: ISubTodo;
  styles?: TwStyle | SerializedStyles;
}

export function SubTodoItem({ todo, styles, }: Props) {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ content, setContent, ] = useState(todo.content);

  const status = {
    ADDED: '대기중',
    PROGRESS: '진행중',
    DONE: '완료',
  };

  const qc = useQueryClient();
  const updateTodo = useUpdateSubTodo(todo.id);
  const deleteTodo = useDeleteSubTodo(todo.id);
  const updateTodoStatus = useUpdateSubTodoStatus(todo.id);

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

  const onChangeStatus = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateTodoStatus.mutate({
        status: event.target.value,
      }, {
        onSuccess() {
          qc.invalidateQueries();
          toast.success(`상태를 '${status[event.target.value]}'으로 변경했습니다.`);
        },
      });
    },
    [ status, updateTodoStatus, ]
  );

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div className='todo-top'>
          <select onChange={onChangeStatus}>
            <option value='ADDED'>대기중</option>
            <option value='PROGRESS'>진행중</option>
            <option value='DONE'>완료</option>
          </select>
          <span>{setDate(todo.created)}</span>
        </div>
        <div className='todo-middle'>
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
            <button onClick={onClickUpdateTodo}>확인</button>
          ) : (
            <>
              <button onClick={onClickEdit}>수정</button>
              <button onClick={onClickDeleteTodo}>삭제</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
