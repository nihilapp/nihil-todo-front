import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { useSelector, useDispatch } from 'react-redux';
import { AppLayout } from '@/layouts';
import { AppDispatch, RootState } from '@/store';
import { ChangeWord } from '@/reducers/TestReducer';

export default function TestPage() {
  const word = useSelector((state: RootState) => state.test.word);
  const dispatch = useDispatch<AppDispatch>();

  const onClickButton = useCallback(() => {
    dispatch(ChangeWord());
  }, [ word, ]);

  const style = {
    default: css([
      tw` py-4 `,
      tw` [>h2]:( p-3 bg-black-700 text-white font-900 text-center text-[2rem] mb-5 ) `,
      tw` [>button]:(
        block w-full p-3 bg-blue-500 text-white text-center text-[1.5rem]
        hover:( bg-blue-600 )
      ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='테스트'>
        <div css={style.default}>
          <h2>Hello {word}!!</h2>
          <button onClick={onClickButton}>변경</button>
        </div>
      </AppLayout>
    </>
  );
}
