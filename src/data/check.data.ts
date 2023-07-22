import { ICheckSelectData } from '@/types/other.type';

export const checkData: ICheckSelectData[] = new Array(3)
  .fill(0)
  .map((item: number, index) => ({
    label: `테스트${item + index}`,
    value: `test${item + index}`,
  }));
