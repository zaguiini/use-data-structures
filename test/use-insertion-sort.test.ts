import { renderHook } from '@testing-library/react-hooks'
import { useInsertionSort } from '../src'

describe('useInsertionSort', () => {
  it('sorts the values correctly without modifying the original array', () => {
    const unsortedArray = [64, 25, 12, 22, 11]
    const { result } = renderHook(() => useInsertionSort(unsortedArray))

    expect(unsortedArray).toEqual([64, 25, 12, 22, 11])
    expect(result.current).toEqual([11, 12, 22, 25, 64])
  })
})
