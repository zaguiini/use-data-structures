import { renderHook, act } from '@testing-library/react-hooks'
import { useWeakSet } from '../src'

describe('useWeakSet', () => {
  it('should add a value', () => {
    let foo = {}

    const { result } = renderHook(() => useWeakSet())

    act(() => {
      result.current.add(foo)
    })

    expect(result.current.has(foo)).toBeTruthy()
  })

  it('should delete a value', () => {
    let foo = {}

    const { result } = renderHook(() => useWeakSet(new WeakSet([foo])))

    act(() => {
      result.current.delete(foo)
    })

    expect(result.current.has(foo)).toBeFalsy()
  })

  it('should clear all values', () => {
    let foo = {},
      bar = {}

    const { result } = renderHook(() => useWeakSet(new WeakSet([foo, bar])))

    expect(result.current.has(foo)).toBeTruthy()
    expect(result.current.has(bar)).toBeTruthy()

    act(() => {
      result.current.clear()
    })

    expect(result.current.has(foo)).toBeFalsy()
    expect(result.current.has(bar)).toBeFalsy()
  })
})
