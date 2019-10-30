import React from 'react';

interface Node<T> {
  data: T;
  next: Node<T> | null;
}

const Node = <T>(data: T, next: Node<T> | null = null) => ({
  data,
  next,
});

export const useLinkedList = <T>(head?: Node<T>) => {
  const [list, setList] = React.useState(head || null);

  const handlers = React.useMemo(() => {
    const addAt = (data: T, index: number) => {
      setList(list => {
        let head;

        if (index === 0) {
          return Node(data, list);
        } else if (list) {
          head = Node(list.data, list.next);
        } else {
          head = Node(data);
        }

        let current = head;

        while (current.next) {
          current = current.next;
        }

        current.next = Node(data);

        return head;
      });
    };

    const add = (data: T) => addAt(data, 0);

    const removeAt = (index: number) => {
      setList(list => {
        if (!list) {
          return list;
        }

        if (index === 0) {
          return list.next;
        }

        let head = Node(list.data, list.next);
        let current = head,
          previous = head,
          counter = 0;

        while (counter < index && current.next) {
          previous = current;
          current = current.next;
          counter++;
        }

        previous.next = current.next;

        return head;
      });
    };

    return {
      add,
      addAt,
      removeAt,
    };
  }, []);

  return [list, handlers];
};
