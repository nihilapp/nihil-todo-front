import { ICheckSelectData } from '@/types/other.type';

export const todoStatusData: ICheckSelectData[] = [
  {
    label: '대기중',
    value: 'ADDED',
  },
  {
    label: '진행중',
    value: 'PROGRESS',
  },
  {
    label: '완료',
    value: 'DONE',
  },
];
