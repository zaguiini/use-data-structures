import React from 'react'

export interface Node<T> {
  data: T
  next: Node<T> | null
}

export const Node = <T>(data: T, next: Node<T> | null = null) => ({
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

export const linkedListHandlers = {
  addAt: <T>(index: number, data: T, head: Node<T> | null) => {
    if (index === 0) {
      return Node(data, head)
    }

    let previous = linkedListHandlers.getAt(index - 1, head)

    if (previous) {
      previous.next = Node(data, previous.next)
    }

    return head
  },

  get: <T>(match: (currentNodeData: T) => boolean, head: Node<T> | null) => {
    let current = head

    while (current) {
      if (match(current.data)) {
        return current
      }

      current = current.next
    }

    return null
  },

  getAt: <T>(index: number, head: Node<T> | null) => {
    let counter = 0
    let current = head

    while (current) {
      if (counter === index) {
        return current
      }

      counter++
      current = current.next
    }

    return null
  },

  prepend: <T>(data: T, head: Node<T> | null) =>
    linkedListHandlers.addAt(0, data, head),

  remove: <T>(match: (currentNodeData: T) => boolean, list: Node<T> | null) => {
    if (!list) {
      return list
    }

    if (match(list.data)) {
      return list.next ? list.next : null
    }

    const head = Node(list.data, list.next)
    let previous = head
    let current = head

    while (current.next && !match(current.data)) {
      previous = current
      current = current.next
    }

    if (previous && match(current.data)) {
      previous.next = current.next
    }

    return head
  },

  removeAt: <T>(index: number, list: Node<T> | null) => {
    if (!list) {
      return list
    } else if (index === 0) {
      return list.next
    }

    let head = Node(list.data, list.next)

    const previous = linkedListHandlers.getAt(index - 1, head)

    if (previous) {
      previous.next = previous.next ? previous.next.next : null
    }

    return head
  },

  size: <T>(head: Node<T> | null) => {
    let size = 0
    let current = head

    while (current) {
      current = current.next
      size++
    }

    return size
  },
}

export const useLinkedList = <T>(
  initialHead?: Node<T>
): [Node<T> | null, Handlers<T>] => {
  const [head, setList] = React.useState(initialHead || null)

  const handlers = React.useMemo(() => {
    const addAt = (data: T, index: number) => {
      setList((list) => {
        return linkedListHandlers.addAt(
          index,
          data,
          list ? Object.assign({}, list) : null
        )
      })
    }

    const prepend = (data: T) => {
      setList((list) => {
        return linkedListHandlers.prepend(
          data,
          list ? Object.assign({}, list) : null
        )
      })
    }

    const removeAt = (index: number) => {
      setList((list) => linkedListHandlers.removeAt(index, list))
    }

    const clear = () => setList(null)

    const size = () => linkedListHandlers.size(head)

    const add = (data: T) => addAt(data, size())

    const get = (value: T) =>
      linkedListHandlers.get((data) => data === value, head)

    const getAt = (index: number) => linkedListHandlers.getAt(index, head)

    const remove = (value: T) =>
      setList((list) =>
        linkedListHandlers.remove((data) => data === value, list)
      )

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
