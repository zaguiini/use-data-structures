import React from 'react'
import produce from 'immer'

type Predicate<T> = (a: T, b: T) => boolean

const defaultPredicate = (a: any, b: any) => a > b

export const bubbleSort = <T>(
  array: T[],
  predicate: Predicate<T> = defaultPredicate
) => {
  let swapped: boolean

  do {
    swapped = false

    for (let arrayIndex = 0; arrayIndex < array.length - 1; arrayIndex++) {
      if (predicate(array[arrayIndex], array[arrayIndex + 1])) {
        const tempElement = array[arrayIndex]
        array[arrayIndex] = array[arrayIndex + 1]
        array[arrayIndex + 1] = tempElement

        swapped = true
      }
    }
  } while (swapped)

  return array
}

export const useBubbleSort = <T>(array: T[], predicate?: Predicate<T>) => {
  const sortedArray = React.useMemo(
    () => produce(array, (draft) => bubbleSort(draft as T[], predicate)),
    [array, predicate]
  )

  return sortedArray
}
