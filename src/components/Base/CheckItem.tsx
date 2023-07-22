import React, { useContext } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { ICheckContextValue, ICheckSelectData } from '@/types/other.type';
import { CheckboxContext } from '@/context/checkbox.context';

interface Props {
  check: ICheckSelectData;
  name: string;
  disabled?: boolean;
  styles?: TwStyle | SerializedStyles;
}

export function CheckItem({
  check, name, disabled, styles,
}: Props) {
  const context = useContext<ICheckContextValue>(CheckboxContext);
  const { isDisabled, isChecked, toggleItem, } = context;

  const style = {
    default: css([
      tw` cursor-pointer inline-flex flex-row gap-1 items-center `,
      styles,
    ]),
    input: css([
      tw` appearance-none `,
    ]),
    box: css([
      tw` flex items-center justify-center rounded-1 p-1 w-[18px] h-[18px] aspect-square bg-black-200 mb-sm:( w-[20px] h-[20px] ) mb-md:( w-[22px] h-[22px] ) `,
      isChecked(check.value) && tw` bg-blue-500 `,
      tw` [svg]:( text-[90%] text-white ) `,
    ]),
    label: css([
      tw` select-none `,
    ]),
  };

  return (
    <>
      <label css={style.default}>
        <input
          type='checkbox'
          name={name}
          disabled={isDisabled(disabled)}
          checked={isChecked(check.value)}
          onChange={({ target: { checked, }, }) => (
            toggleItem({ checked, value: check.value, })
          )}
          css={style.input}
        />
        <span css={style.box}>
          {isChecked(check.value) && <Icon icon='mingcute:check-fill' />}
        </span>
        <span css={style.label}>{check.label}</span>
      </label>
    </>
  );
}
