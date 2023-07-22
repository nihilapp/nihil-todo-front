import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ITodo } from '@/types/entity.typs';
import { useDeleteTodo, useUpdateTodo, useUpdateTodoStatus } from '@/hooks/queries';
import { SubTodoInput } from './SubTodoInput';
import { SubTodoList } from './SubTodoList';
import { setDate } from '@/utils/date';
import { Select } from '../Base';
import { todoStatusData } from '@/data/select.data';
import { ICheckSelectData } from '@/types/other.type';

interface Props {
  todo: ITodo;
  styles?: TwStyle | SerializedStyles;
}

export function TodoItem({ todo, styles, }: Props) {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ isShowSubTodos, setIsShowSubTodos, ] = useState(false);
  const [ content, setContent, ] = useState(todo.content);
  const [ selectedStatus, setSelectedStatus, ] = useState<ICheckSelectData>(null);

  const status = {
    ADDED: '대기중',
    PROGRESS: '진행중',
    DONE: '완료',
  };

  const qc = useQueryClient();
  const updateTodo = useUpdateTodo(todo.id);
  const deleteTodo = useDeleteTodo(todo.id);
  const updateTodoStatus = useUpdateTodoStatus(todo.id);

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
    [ updateTodoStatus, ]
  );

  const onClickOpen = useCallback(() => {
    setIsShowSubTodos((prev) => !prev);
  }, []);

  const style = {
    default: css([
      tw` mb-3 nth-last-1:mb-0 `,
      styles,
    ]),

  };

  return (
    <>
      <div css={style.default}>
        <div className='todo-top'>
          <Select
            item={selectedStatus}
            onChange={setSelectedStatus}
            data={todoStatusData}
          />

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
              onChange={onChangeTodo}
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
        <div className='todo-bottom'>
          <button onClick={onClickOpen}>하위 목록</button>
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
