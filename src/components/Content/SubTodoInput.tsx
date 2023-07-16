import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { ITodo } from '@/types/entity.typs';
import { useInput } from '@/hooks';
import { RootState } from '@/store';
import { useCreateSubTodo } from '@/hooks/queries';

interface Props {
  todo: ITodo;
  styles?: SerializedStyles;
}

export function SubTodoInput({ todo, styles, }: Props) {
  const subTodoInput = useInput<HTMLInputElement>('sub-todo-input');
  const user = useSelector((state: RootState) => state.auth.user);

  const qc = useQueryClient();
  const createTodo = useCreateSubTodo();

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      createTodo.mutate({
        userId: user.id,
        todoId: todo.id,
        content: subTodoInput.data.value,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          toast.success('새로운 할 일을 추가했습니다.');
          subTodoInput.setValue('');
        },
      });
    },
    [ subTodoInput, createTodo, ]
  );

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <form onSubmit={onSubmitForm} css={style.default}>
        <input
          type='text'
          placeholder='할 일을 입력하세요'
          autoComplete='false'
          {...subTodoInput.data}
        />
        <button>추가</button>
      </form>
    </>
  );
}
