import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Icon } from '@iconify/react';
import { useInput } from '@/hooks';
import { useCreateTodo } from '@/hooks/queries';
import { RootState } from '@/store';
import { todoInputStyle } from './style/todo.input.style';
import { IErrorMessage } from '@/types/axios.type';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function TodoInput({ styles, }: Props) {
  const [ isError, setIsError, ] = useState(false);
  const [ errorMessage, setErrorMessage, ] = useState('');

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
          setIsError(false);
          setErrorMessage('');
        },

        onError(error: AxiosError<IErrorMessage>) {
          setIsError(true);
          setErrorMessage(error.response.data.message);
        },
      });
    },
    [ todoInput, createTodo, ]
  );

  const style = {
    default: css([
      tw`  `,
      todoInputStyle,
      styles,
    ]),
    errorMessage: css([
      tw` text-red-500 mt-1 font-700 basis-full text-right `,
    ]),
  };

  return (
    <>
      <form onSubmit={onSubmitForm} css={style.default}>
        <input
          type='text'
          placeholder='할 일을 입력하세요'
          autoComplete='off'
          {...todoInput.data}
        />
        <button><Icon icon='mingcute:add-fill' />추가</button>
        {isError && (
          <p css={style.errorMessage}>{errorMessage}</p>
        )}
      </form>
    </>
  );
}
