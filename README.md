# useDataStructures

The power of advanced data structures -- now on React!

This lib adds reactive capacities to data structures, like `Set`s and `Map`s to React.

## Installation

`yarn add use-data-structures`

## Usage

### Data structures

#### [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

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

---

### Sorting algorithms

#### [Selection sort](https://www.geeksforgeeks.org/selection-sort/)

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

## License

MIT
