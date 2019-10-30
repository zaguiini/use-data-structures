import { renderHook, act } from '@testing-library/react-hooks'
import { useMap } from '../src'

describe('useMap', () => {
  it('should add a value', () => {
    const { result } = renderHook(() => useMap())

    act(() => {
      result.current.set('key', 'value')
    })

    expect(result.current.size).toBe(1)
    expect(result.current.has('key')).toBeTruthy()
  })

  it('should add a value to the initial state', () => {
    const initialState = new Map([['key1', 'value1']])
    const { result } = renderHook(() => useMap(initialState))

    act(() => {
      result.current.set('key2', 'value2')
    })

    expect(result.current.size).toBe(2)
    expect(result.current.has('key1')).toBeTruthy()
    expect(result.current.has('key2')).toBeTruthy()
  })

  it('should clear all values', () => {
    const initialState = new Map([['key1', 'value1']])
    const { result } = renderHook(() => useMap(initialState))

    expect(result.current.size).toBe(1)
    expect(result.current.has('key1')).toBeTruthy()

    act(() => {
      result.current.clear()
    })

    expect(result.current.size).toBe(0)
    expect(result.current.has('key1')).toBeFalsy()
  })

  it('should delete a value', () => {
    const initialState = new Map([['key1', 'value1']])
    const { result } = renderHook(() => useMap(initialState))

    expect(result.current.size).toBe(1)
    expect(result.current.has('key1')).toBeTruthy()

    act(() => {
      result.current.delete('key1')
    })

    expect(result.current.size).toBe(0)
    expect(result.current.has('key1')).toBeFalsy()
  })
})
