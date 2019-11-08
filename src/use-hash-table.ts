import { Node, linkedListHandlers } from './use-linked-list'
import React from 'react'
import produce from 'immer'

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

export const useHashTable = <TKey extends string, TValue>(
  initialHashMap: Node<[TKey, TValue]>[] = [],
  hashFunction = defaultHashFunction
) => {
  const [table, setValue] = React.useState(initialHashMap)

  const handlers = React.useMemo(
    () => ({
      get: (key: TKey) => {
        const index = hashFunction(key)
        const match = table[index]

        if (match) {
          const found = linkedListHandlers.get<[TKey, TValue]>(
            ([currentKey]) => currentKey === key,
            match
          )

          if (found) {
            return found.data[1]
          }
        }

        return null
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
