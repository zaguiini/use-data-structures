import { renderHook } from '@testing-library/react-hooks'
import { useSelectionSort } from '../src'

describe('useSelectionSort', () => {
  it('sorts the values correctly without modifying the original array', () => {
    const unsortedArray = [64, 25, 12, 22, 11]
    const { result } = renderHook(() => useSelectionSort(unsortedArray))

    expect(unsortedArray).toEqual([64, 25, 12, 22, 11])
    expect(result.current).toEqual([11, 12, 22, 25, 64])
  })
})
