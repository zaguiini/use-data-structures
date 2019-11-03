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
    const addAt = (data: T, index: number) => {
      setList((list) => {
        let head

        if (index === 0) {
          return NodeClass(data, list)
        } else if (list) {
          head = NodeClass(list.data, list.next)
        } else {
          head = NodeClass(data)
        }

        let current = head

        while (current.next) {
          current = current.next
        }

        current.next = NodeClass(data)

        return head
      })
    }

    const prepend = (data: T) => addAt(data, 0)

    const removeAt = (index: number) => {
      setList((list) => {
        if (!list) {
          return list
        }

        if (index === 0) {
          return list.next ? list.next : null
        }

        let head = NodeClass(list.data, list.next)
        let current = head
        let previous = head
        let counter = 0

        for (; counter < index && current.next; counter++) {
          previous = current
          current = current.next
        }

        if (counter === index) {
          previous.next = current.next
        }

        return head
      })
    }

    const clear = () => setList(null)

    const size = () => {
      let size = 0

      for (let current = head; !!current; size++) {
        current = current.next
      }

      return size
    }

    const add = (data: T) => addAt(data, size())

    const get = (value: T) => {
      for (
        let current = head;
        current && current.next;
        current = current.next
      ) {
        if (current && current.data === value) {
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

        if (current && current.data === value) {
          return head.next
        }

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
      prepend,
      remove,
      removeAt,
      size,
    }
  }, [head])

  return [head, handlers]
}
