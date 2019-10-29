# useDataStructures

The power of advanced data structures -- now on React!

This library adds reactive capacities to data structures, like `Set`s and `Map`s as React state.

## Installation

`yarn add use-data-structures`

## Usage

### Sets

Test it on [CodeSandbox](https://codesandbox.io/s/quizzical-fermi-4jwue)

```js
import { useSet } from 'use-data-structures';

function App() {
  const [set, handlers] = useSet();
  // just like useState, you can pass
  // a default value (e.g. new Set([1, 2, 3]))

  const toggleExistence = () => {
    if (set.has(3)) {
      handlers.delete(3);
    } else {
      handlers.add(3);
    }
  };

  return (
    <>
      <p>Set has value 3: {set.has(3).toString()}</p>
      <button onClick={toggleExistence}>Toggle 3</button>
    </>
  );
}
```

## TODO

- Maps/Hashes
- WeakMaps and WeakSets
- Stacks
- Queues
- Trees/Heaps
- Graphs
- Linked lists

**This is a tough task! Feel free to contribute!**

## License

MIT
