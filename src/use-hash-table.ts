import React from 'react'
import produce from 'immer'

import { Node, linkedListHandlers } from './use-linked-list'

const defaultHashFunction = <TKey extends string>(key: TKey) => {
  let hash = 0

  if (!key.length) {
    return hash
  }

  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i)
    hash = hash & hash
  }

  return Math.abs(hash)
}

type HashTableValues<TKey, TValue> = { [key: number]: Node<[TKey, TValue]> }

export const useHashTable = <TKey extends string, TValue>(
  initialHashMap: HashTableValues<TKey, TValue> = {},
  hashFunction: (key: any) => number = defaultHashFunction
) => {
  const [table, setValue] = React.useState(initialHashMap)

  const handlers = React.useMemo(
    () => ({
      clear: () => setValue([]),

      delete: (key: TKey) => {
        setValue((table) =>
          produce(table, (draft: Node<[TKey, TValue]>[]) => {
            const index = hashFunction(key)
            const match = draft[index]

            if (match) {
              draft[index] = linkedListHandlers.remove<[TKey, TValue]>(
                ([currentKey]) => currentKey === key,
                match
              ) as Node<[TKey, TValue]>
            }
          })
        )
      },

      get: (key: TKey) => {
        const index = hashFunction(key)
        const match = table[index]

        if (match) {
          let found = linkedListHandlers.get<[TKey, TValue]>(
            ([currentKey]) => currentKey === key,
            match
          )

          while (found) {
            if (found.data[0] === key) {
              return found.data[1]
            }
          }
        }

        return null
      },

      has: (key: TKey) => {
        const index = hashFunction(key)

        return !!table[index]
      },

      set: (key: TKey, value: TValue) =>
        setValue((table) =>
          produce(table, (draft: Node<[TKey, TValue]>[]) => {
            const index = hashFunction(key)

            if (draft[index]) {
              const size = linkedListHandlers.size(draft[index])
              draft[index] = linkedListHandlers.addAt(
                size,
                [key, value],
                draft[index]
              ) as Node<[TKey, TValue]>
            } else {
              draft[index] = Node([key, value])
            }
          })
        ),
    }),
    [hashFunction, table]
  )

  return handlers
}
