import React from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { PageTitle } from '@/components/Base';

export default function signin() {
  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='로그인'>
        <div css={style.default}>
          <PageTitle>로그인</PageTitle>
        </div>
      </AppLayout>
    </>
  );
}
