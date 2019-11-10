import { renderHook, act } from '@testing-library/react-hooks'
import { useHashTable } from '../src'

describe('useHashTable', () => {
  it('should set a value', () => {
    const { result } = renderHook(() => useHashTable())

    act(() => {
      result.current.set('123', '456')
    })

    expect(result.current.has('123')).toBe(true)
  })

  it('should handle collisions', () => {
    const hashFunction = (key: string) =>
      key.split('').reduce((curr, next) => curr + next.charCodeAt(0), 0)

    const { result } = renderHook(() =>
      useHashTable(undefined, {
        hashFunction,
        bucketSize: 5,
      })
    )

    act(() => {
      result.current.set('123', '456')
      result.current.set('321', '456')
    })

    expect(result.current.get('123')).toBe('456')
    expect(result.current.get('321')).toBe('456')
  })

  it('should get a value', () => {
    const { result } = renderHook(() => useHashTable())

    act(() => {
      result.current.set('123', '456')
    })

    expect(result.current.get('123')).toBe('456')
  })

  it('should delete a value', () => {
    const { result } = renderHook(() => useHashTable())

    act(() => {
      result.current.set('123', '456')
    })

    act(() => {
      result.current.delete('123')
    })

    expect(result.current.get('123')).toBe(null)
  })

  it('should clear all values', () => {
    const { result } = renderHook(() => useHashTable())

    act(() => {
      result.current.set('123', '456')
    })

    act(() => {
      result.current.clear()
    })

    expect(result.current.get('123')).toBe(null)
  })
})
