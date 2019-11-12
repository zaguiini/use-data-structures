import { useState, useMemo, useCallback } from 'react'
import produce from 'immer'

export interface IBinaryTreeNode {
  data: number
  left: IBinaryTreeNode | null
  right: IBinaryTreeNode | null
}

type BinaryTreeType = IBinaryTreeNode | null

const BinaryTreeNodeClass = (
  data: number,
  left: BinaryTreeType = null,
  right: BinaryTreeType = null
) => ({
  data,
  left,
  right,
})

export const useBinaryTree = (initialRoot: BinaryTreeType = null) => {
  const [root, setRoot] = useState(initialRoot)

  const addNewNode = useCallback(
    (currentNode: IBinaryTreeNode, newNode: IBinaryTreeNode) => {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode
        } else {
          addNewNode(currentNode.left, newNode)
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode
        } else {
          addNewNode(currentNode.right, newNode)
        }
      }
    },
    []
  )

  const findMinNode = useCallback((node: IBinaryTreeNode): IBinaryTreeNode => {
    if (!node.left) {
      return node
    }

    return findMinNode(node.left)
  }, [])

  const removeNode = useCallback(
    (currentNode: BinaryTreeType, key: number) => {
      if (!currentNode) return null

      if (key < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, key)
        return currentNode
      } else if (key > currentNode.data) {
        currentNode.right = removeNode(currentNode.right, key)
        return currentNode
      } else {
        if (!currentNode.left && !currentNode.right) {
          currentNode = null
          return currentNode
        }

        if (!currentNode.left) {
          currentNode = currentNode.right
          return currentNode
        } else if (!currentNode.right) {
          currentNode = currentNode.left
          return currentNode
        }

        let minNode = findMinNode(currentNode.right)
        currentNode.data = minNode.data

        currentNode.right = removeNode(currentNode.right, minNode.data)
        return currentNode
      }
    },
    [findMinNode]
  )

  const handlers = useMemo(
    () => ({
      add: (item: number) => {
        setRoot((oldRoot) =>
          produce(oldRoot, (draft: IBinaryTreeNode) => {
            let root = BinaryTreeNodeClass(item)

            if (!oldRoot) {
              draft = root
            } else {
              addNewNode(draft, root)
            }

            return draft
          })
        )
      },

      inorder: (): number[] => {
        let inorderValues: number[] = []

        const mountInorderValues = (node: BinaryTreeType) => {
          if (node) {
            mountInorderValues(node.left)
            inorderValues.push(node.data)
            mountInorderValues(node.right)
          }
        }

        if (root) {
          mountInorderValues(root)
        }

        return inorderValues
      },

      postorder: (): number[] => {
        let postorderValues: number[] = []

        const mountPostorderValues = (node: BinaryTreeType) => {
          if (node) {
            mountPostorderValues(node.left)
            mountPostorderValues(node.right)
            postorderValues.push(node.data)
          }
        }

        if (root) {
          mountPostorderValues(root)
        }

        return postorderValues
      },

      preorder: (): number[] => {
        let preorderValues: number[] = []

        const mountPreorderValues = (node: BinaryTreeType) => {
          if (node) {
            preorderValues.push(node.data)
            mountPreorderValues(node.left)
            mountPreorderValues(node.right)
          }
        }

        if (root) {
          mountPreorderValues(root)
        }

        return preorderValues
      },

      remove: (item: number) => {
        setRoot((oldRoot) =>
          produce(oldRoot, (draft: IBinaryTreeNode) => {
            if (!draft) return null

            return removeNode(oldRoot, item)
          })
        )
      },

      search: (item: number) => {
        const searchValue = (
          node: BinaryTreeType,
          value: number
        ): BinaryTreeType => {
          if (!node) return null

          if (value < node.data) {
            return searchValue(node.left, value)
          }

          if (value > node.data) {
            return searchValue(node.right, value)
          }

          return node
        }

        let node = searchValue(root, item)

        return node
      },
    }),
    [addNewNode, removeNode, root]
  )

  return handlers
}
