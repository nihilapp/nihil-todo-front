export interface ICheckSelectData {
  value: string;
  label: string;
}

interface IToggleItemParameter {
  checked: boolean;
  value: string;
}

export interface ICheckContextValue {
  // eslint-disable-next-line no-unused-vars
  isDisabled: (disabled: boolean) => boolean;
  // eslint-disable-next-line no-unused-vars
  isChecked: (value: string) => boolean;
  // eslint-disable-next-line no-unused-vars
  toggleItem: (toggleItemParameter: IToggleItemParameter) => void;
}

export interface ISelectContextValue {
  // eslint-disable-next-line no-unused-vars
  selectItem: (value: ICheckSelectData) => void;
  // eslint-disable-next-line no-unused-vars
  isSelect: (value: string) => boolean;
  // eslint-disable-next-line no-unused-vars
  isDisabled: (disabled: boolean) => boolean;
  defaultSelect: () => void;
}
