import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useTodos } from '@/hooks/queries';
import { TodoItem } from './TodoItem';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function TodoList({ styles, }: Props) {
  const { data: todos, } = useTodos();

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
