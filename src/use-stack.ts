import { useState, useMemo } from 'react';
import produce from 'immer';

export const useStack = <T>(initialState: T[] = []) => {
  const [value, setValue] = useState(initialState);

  const handlers = useMemo(
    () => ({
      isEmpty: () => {
        return value.length === 0;
      },

      peek: () => {
        let peeked = value[value.length - 1];
        return peeked;
      },

      pop: () => {
        if (value.length === 0) return;

        let popped;
        setValue(oldStack =>
          produce(oldStack, (draft: T[]) => {
            popped = draft.pop();
          })
        );
        return popped;
      },

      push: (item: T) => {
        setValue(oldStack =>
          produce(oldStack, (draft: T[]) => {
            draft.push(item);
          })
        );
      },

      size: value.length,
    }),
    [value]
  );

  return handlers;
};
