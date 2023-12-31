import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSubTodos } from '@/hooks/queries';
import { ITodo } from '@/types/entity.typs';
import { SubTodoItem } from './SubTodoItem';

interface Props {
  todo: ITodo;
  styles?: TwStyle | SerializedStyles;
}

export function SubTodoList({ todo, styles, }: Props) {
  const { data: subTodos, } = useSubTodos(todo.id);

  const style = {
    default: css([
      tw` ml-8 `,
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
