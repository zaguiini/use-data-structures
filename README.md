# useDataStructures

The power of advanced data structures -- now on React!

This lib adds reactive capacities to data structures, like `Set`s and `Map`s to React.

## Installation

`yarn add use-data-structures`

---

## Data structures

[What is a data structure, anyways?](https://en.wikipedia.org/wiki/Data_structure)

NOTE: it looks obvious, but bear in mind that the values itself are not reactive, only the underlying implementation of the setters.
It is really important to remember to **not directly modify any value!!!**

### [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

Test it on [CodeSandbox](https://codesandbox.io/s/quizzical-fermi-4jwue)

```js
import { useSet } from 'use-data-structures';

function App() {
  const set = useSet();
  // just like useState, you can pass
  // a default value (e.g. new Set([1, 2, 3]))

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

### [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Test it on [CodeSandbox](https://codesandbox.io/s/silly-leaf-i19r0)

```js
import { useMap } from 'use-data-structures';

function App() {
  const map = useMap();
  // just like useState, you can pass
  // a default value (e.g. new Map([["key", "value"]]))

  const toggleExistence = () => {
    if (map.has('key')) {
      map.delete('key');
    } else {
      map.set('key', 'value');
    }
  };

  return (
    <>
      <p>Map has value for 'key': {map.has('key').toString()}</p>
      <button onClick={toggleExistence}>Toggle 'Key'</button>
    </>
  );
}
```

## Sorting algorithms

[What is a sorting algorithm and why should I care?](https://en.wikipedia.org/wiki/Sorting_algorithm)

**NOTE: NO hook mutates the original array. Instead, all of them creates a shallow copy!**

### [Selection sort](https://www.geeksforgeeks.org/selection-sort/)

Test it on [CodeSandbox](https://codesandbox.io/s/frosty-kalam-87gri)

```js
import { useSelectionSort } from 'use-data-structures';

function App({ unsortedArray }) {
  const sortedArray = useSelectionSort(unsortedArray);
  // you can pass a custom predicate as the second argument
  // to change how the array will be sorted
  // (e.g. (a, b) => a > b) to sort the list in descending order

  return (
    <ul>
      {sortedArray.map(value => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}
```

---

## Contributing

PRs are more than welcome! Feel free to fill as many as you want and collaborate with the community.
This project embraces TypeScript and good practices, so be sure you are aware of them!

## License

MIT
