import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useInput } from '@/hooks';
import { useCreateTodo } from '@/hooks/queries';
import { RootState } from '@/store';

interface Props {
  styles?: SerializedStyles;
}

export function TodoInput({ styles, }: Props) {
  const todoInput = useInput<HTMLInputElement>('todo-input');
  const user = useSelector((state: RootState) => state.auth.user);

  const qc = useQueryClient();
  const createTodo = useCreateTodo();

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      createTodo.mutate({
        userId: user.id,
        content: todoInput.data.value,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          toast.success('새로운 할 일을 추가했습니다.');
          todoInput.setValue('');
        },
      });
    },
    [ todoInput, createTodo, ]
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
          {...todoInput.data}
        />
        <button>추가</button>
      </form>
    </>
  );
}
