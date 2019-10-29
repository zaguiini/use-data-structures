import React from 'react';

export const useSet = <T>(initialValue = new Set<T>()) => {
  const [value, setValue] = React.useState(initialValue);

  const handlers = React.useMemo(() => {
    return Object.assign(value, {
      add: (item: T) => {
        setValue((oldSet: Set<T>) => {
          const newSet = new Set(oldSet);
          newSet.add(item);

          return newSet;
        });
      },

      clear: () => setValue(new Set()),

      delete: (item: T) => {
        setValue((oldSet: Set<T>) => {
          const newSet = new Set(oldSet);
          newSet.delete(item);

          return newSet;
        });
      },
    });
  }, [value]);

  return handlers;
};
