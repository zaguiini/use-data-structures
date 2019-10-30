import { useState, useMemo } from 'react';

export const useStack = <T>(initialState: T[] = []) => {
  const [value, setValue] = useState(initialState);

  const handlers = useMemo(
    () =>
      Object.assign(value, {
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
          setValue(oldStack => {
            const newStack = [...oldStack];
            popped = newStack.pop();

            return newStack;
          });

          return popped;
        },

        push: (item: T) => {
          setValue(oldStack => {
            const newStack = [...oldStack];
            newStack.push(item);

            return newStack;
          });
        },
      }),
    [value]
  );

  return handlers;
};
