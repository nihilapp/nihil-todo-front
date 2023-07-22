import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import { ICheckSelectData } from '@/types/other.type';
import { CheckboxContext } from '@/context/checkbox.context';
import { CheckItem } from './CheckItem';
import { textStyle } from '@/styles/text.style';

interface Props {
  data: ICheckSelectData[];
  values: string[];
  name: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (values: string[]) => void;
  styles?: TwStyle | SerializedStyles;
}

export function Check({
  data = [], values, name, disabled: groupDisabled, onChange, styles,
}: Props) {
  const isDisabled = (disabled: boolean) => (disabled || groupDisabled);

  const isChecked = (value: string) => (
    values.includes(value)
  );

  const toggleItem = ({ checked, value, }: {checked: boolean, value: string}) => {
    if (checked) {
      onChange(values.concat(value));
    } else {
      onChange(values.filter((item) => item !== value));
    }
  };

  const memoizedValue = useMemo(
    () => ({ isDisabled, isChecked, toggleItem, }),
    [ isDisabled, isChecked, toggleItem, ]
  );

  const style = {
    default: css([
      tw` flex flex-row gap-2 text-black-base `,
      styles,
      textStyle.size,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <CheckboxContext.Provider value={memoizedValue}>
          {data.map((check) => (
            <CheckItem key={uuid()} check={check} name={name} />
          ))}
        </CheckboxContext.Provider>
      </div>
    </>
  );
}
