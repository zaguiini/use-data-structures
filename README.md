# useDataStructures

The power of advanced data structures -- now on React!

This lib adds reactive capacities to data structures, like `Set`s and `Map`s to React.

## Installation

`yarn add use-data-structures`

## Usage

### Sets

```js
import { useSet } from 'use-data-structures';

function App() {
  const set = useSet();
  // just like useState, you can pass
  // a default value (e.g. new Set(1, 2, 3))

  const toggleExistence = () => {
    if (set.has(3)) {
      set.delete(3);
    } else {
      set.add(3);
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
- Stacks
- Queues
- Trees/Heaps
- Graphs
- Linked lists

**This is a tough task! Feel free to contribute!**

## License

MIT
