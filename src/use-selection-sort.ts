import React from 'react';
import produce from 'immer';

type Predicate<T> = (a: T, b: T) => boolean;

const defaultPredicate = (a: any, b: any) => a < b;

export const selectionSort = <T>(
  array: T[],
  predicate: Predicate<T> = defaultPredicate
) => {
  for (let arrayIndex = 0; arrayIndex < array.length - 1; arrayIndex++) {
    let minIndex = arrayIndex;

    for (
      let subArrayIndex = arrayIndex + 1;
      subArrayIndex < array.length;
      subArrayIndex++
    ) {
      if (predicate(array[subArrayIndex], array[minIndex])) {
        minIndex = subArrayIndex;
      }
    }

    const minIndexElement = array[minIndex];
    array[minIndex] = array[arrayIndex];
    array[arrayIndex] = minIndexElement;
  }

  return array;
};

export const useSelectionSort = <T>(array: T[], predicate?: Predicate<T>) => {
  const sortedArray = React.useMemo(
    () => produce(array, draft => selectionSort(draft as T[], predicate)),
    [array, predicate]
  );

  return sortedArray;
};
