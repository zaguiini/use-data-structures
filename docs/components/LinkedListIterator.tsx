import React from 'react'
import { Node } from '../../src'

function LinkedListIterator({ head }: { head: Node<number> | null }) {
  return (
    head && (
      <div>
        <p>Data: {head.data}</p>
        <LinkedListIterator head={head.next} />
      </div>
    )
  )
}

export default LinkedListIterator
