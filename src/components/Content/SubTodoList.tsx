import React from 'react';
import tw, { css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSubTodo } from '@/hooks/queries';
import { ITodo } from '@/types/entity.typs';
import { SubTodoItem } from './SubTodoItem';

interface Props {
  todo: ITodo;
  styles?: SerializedStyles;
}

export function SubTodoList({ todo, styles, }: Props) {
  const { data: subTodos, } = useSubTodo(todo.id);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {subTodos.map((todo) => (
          <SubTodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
