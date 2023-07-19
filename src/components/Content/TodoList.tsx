import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useTodoByUserId } from '@/hooks/queries';
import { TodoItem } from './TodoItem';
import { RootState } from '@/store';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function TodoList({ styles, }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: todos, } = useTodoByUserId(user.id);

  console.log(todos);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
