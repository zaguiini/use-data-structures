import React from 'react'

export interface Node<T> {
  data: T
  next: Node<T> | null
}

const NodeClass = <T>(data: T, next: Node<T> | null = null) => ({
  data,
  next,
})

interface Handlers<T> {
  add: (data: T) => void
  addAt: (data: T, index: number) => void
  clear: () => void
  get: (value: T) => Node<T> | null
  getAt: (index: number) => void
  prepend: (data: T) => void
  remove: (value: T) => void
  removeAt: (index: number) => void
  size: () => number
}

export const useLinkedList = <T>(
  initialHead?: Node<T>
): [Node<T> | null, Handlers<T>] => {
  const [head, setList] = React.useState(initialHead || null)

  const handlers = React.useMemo(() => {
    const getAt = (index: number, headEl = head) => {
      let counter = 0
      let current = headEl

      while (current) {
        if (counter === index) {
          return current
        }

        counter++
        current = current.next
      }

      return null
    }

    const addAt = (data: T, index: number) => {
      setList((list) => {
        let head = NodeClass(data)

        if (index === 0) {
          return NodeClass(data, list)
        } else if (list) {
          head = NodeClass(list.data, list.next)
        }

        let previous = getAt(index - 1, head)

        if (previous) {
          previous.next = NodeClass(data, previous.next)
        }

        return head
      })
    }

    const prepend = (data: T) => addAt(data, 0)

    const removeAt = (index: number) => {
      setList((list) => {
        if (!list) {
          return list
        }

        let head = NodeClass(list.data, list.next)

        const previous = getAt(index - 1, head)

        if (previous) {
          previous.next = previous.next ? previous.next.next : null
        }

        return head
      })
    }

    const clear = () => setList(null)

    const size = () => {
      let size = 0
      let current = head

      while (current) {
        current = current.next
        size++
      }

      return size
    }

    const add = (data: T) => addAt(data, size())

    const get = (value: T) => {
      let current = head

      while (current) {
        if (current.data === value) {
          return current
        }

        current = current.next
      }

      return null
    }

    const remove = (value: T) => {
      setList((list) => {
        if (!list) {
          return list
        }

        if (list.data === value) {
          return list.next ? list.next : null
        }

        const head = NodeClass(list.data, list.next)
        let previous = head
        let current = head

        while (current.next && current.data !== value) {
          previous = current
          current = current.next
        }

        if (previous && current.data === value) {
          previous.next = current.next
        }

        return head
      })
    }

    return {
      add,
      addAt,
      clear,
      get,
      getAt,
      prepend,
      remove,
      removeAt,
      size,
    }
  }, [head])

  return [head, handlers]
}
