import React from 'react'
import produce from 'immer'

type Predicate<T> = (a: T, b: T) => boolean

const defaultPredicate = (a: any, b: any) => a > b

function insertionSort<T>(
  array: T[],
  predicate: Predicate<T> = defaultPredicate
) {
  for (let j = 1; j < array.length; j++) {
    const key = array[j]
    let i = j - 1

    while (i >= 0 && predicate(array[i], key)) {
      array[i + 1] = array[i]
      i -= 1
    }

    array[i + 1] = key
  }

  return array
}

export const useInsertionSort = <T>(array: T[], predicate?: Predicate<T>) => {
  const sortedArray = React.useMemo(
    () => produce(array, (draft) => insertionSort(draft as T[], predicate)),
    [array, predicate]
  )

  return sortedArray
}
