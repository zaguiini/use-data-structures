import React from 'react'
import produce from 'immer'

import { NodeType, linkedListHandlers, LinkedListNode } from './use-linked-list'

const defaultHashFunction = (key: string, bucketSize: number) => {
  let hash = 0

  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i)
    hash = hash & hash
  }

  return Math.abs(hash) % bucketSize
}

type HashTableValues<TKey, TValue> = (NodeType<[TKey, TValue]> | null)[]

interface HashTableOptions {
  hashFunction?: (key: any, bucketSize: number) => number
  bucketSize?: number
}

export const useHashTable = <TKey extends any, TValue>(
  initialHashTable?: HashTableValues<TKey, TValue>,
  { hashFunction = defaultHashFunction, bucketSize = 42 }: HashTableOptions = {}
) => {
  const [table, setValue] = React.useState(() => {
    if (initialHashTable) {
      return initialHashTable
    }

    return new Array(bucketSize) as HashTableValues<TKey, TValue>
  })

  const handlers = React.useMemo(
    () => ({
      clear: () => setValue(new Array(bucketSize)),

      delete: (key: TKey) => {
        setValue((table) =>
          produce(table, (draft: HashTableValues<TKey, TValue>) => {
            const index = hashFunction(key, bucketSize)
            const match = draft[index]

            if (match) {
              draft[index] = linkedListHandlers.remove<[TKey, TValue]>(
                ([currentKey]) => currentKey === key,
                match
              )
            }
          })
        )
      },

      get: (key: TKey) => {
        const index = hashFunction(key, bucketSize)
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
        const index = hashFunction(key, bucketSize)

        return !!table[index]
      },

      size: () => {
        return table.reduce((curr, next) => {
          return curr + linkedListHandlers.size(next)
        }, 0)
      },

      set: (key: TKey, value: TValue) =>
        setValue((table) =>
          produce(table, (draft: HashTableValues<TKey, TValue>) => {
            const index = hashFunction(key, bucketSize)

            if (draft[index]) {
              const size = linkedListHandlers.size(draft[index])

              draft[index] = linkedListHandlers.addAt(
                size,
                [key, value],
                draft[index]
              )
            } else {
              draft[index] = LinkedListNode([key, value])
            }
          })
        ),
    }),
    [bucketSize, hashFunction, table]
  )

  return handlers
}
