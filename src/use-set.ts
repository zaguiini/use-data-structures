import React from 'react';
import Immutable from 'immutable';

export type UseSetInput<T> = Set<T> | Immutable.Set<T>;

export interface UseSetHandlers<T> {
  add: (item: T) => void;
  clear: () => void;
  delete: (item: T) => void;
}

export type UseSetReturn<T> = [Immutable.Set<T>, UseSetHandlers<T>];

export const useSet = <T>(
  initialValue: UseSetInput<T> = new Set()
): UseSetReturn<T> => {
  const [value, setValue] = React.useState(() => Immutable.Set(initialValue));

  const handlers = React.useMemo(() => {
    return {
      add: (item: T) => setValue(oldSet => oldSet.add(item)),
      clear: () => setValue(oldSet => oldSet.clear()),
      delete: (item: T) => setValue(oldSet => oldSet.delete(item)),
    };
  }, []);

  return [value, handlers];
};
