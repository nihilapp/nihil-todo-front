import {
  Dispatch, SetStateAction, useEffect, useState
} from 'react';
import { getStorage, setStorage } from '@/utils/storage';

export const useStorage = <T> (key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] => {
  const [ state, setState, ] = useState<T>(() => (
    typeof window !== 'undefined' ? getStorage<T>(key) || initialState : initialState
  ));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStorage(key, state);
    }
  }, [ key, state, ]);

  return [ state, setState, ];
};
