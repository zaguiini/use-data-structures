# useDataStructures

The power of advanced data structures -- now on React!
This library adds reactive capacities to data structures as React state.

## Installation

`yarn add use-data-structures`

Powered by [TSDX](https://github.com/jaredpalmer/tsdx), TypeScript typing definitions are included by default.
For the moment we don't have Flow typings but PRs are welcome!

---

## Sorting algorithms

[What is a sorting algorithm and why should I care?](https://en.wikipedia.org/wiki/Sorting_algorithm)

**NOTE: NO hook mutates the original array. Instead, all of them creates a shallow copy!**

### Supported algorithms

- [Selection sort](https://www.geeksforgeeks.org/selection-sort/) (`useSelectionSort`)
- [Bubble sort](https://www.geeksforgeeks.org/bubble-sort/) (`useBubbleSort`)

### Sample usage:

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

Every sorting algorithm goes the same way: `useAlgorithm` with the unsorted array as the first argument and an optional predicate function.

---

## Contributing

PRs are more than welcome! Feel free to fill as many as you want and collaborate with the community.
This project embraces TypeScript and good practices, so be sure you are aware of them!

## License

MIT
