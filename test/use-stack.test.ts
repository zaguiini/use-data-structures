import { renderHook, act } from '@testing-library/react-hooks'
import { useStack } from '../src'

describe('useStack', () => {
  it('should return true for an empty stack', () => {
    const { result } = renderHook(() => useStack())

    expect(result.current.isEmpty()).toBeTruthy()
  })

  it('should return false because the stack contains one element', () => {
    const { result } = renderHook(() => useStack([1]))

    expect(result.current.isEmpty()).toBeFalsy()
  })

  it('should push a value', () => {
    const { result } = renderHook(() => useStack())

    act(() => {
      result.current.push(1)
    })

    expect(result.current.isEmpty()).toBeFalsy()
    expect(result.current.size).toBe(1)
  })

  it('should pop a value', () => {
    const { result } = renderHook(() => useStack([1]))

    let popped
    act(() => {
      popped = result.current.pop()
    })

    expect(popped).toBe(1)
    expect(result.current.isEmpty()).toBeTruthy()
  })

  it('should peek a value', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]))

    let peeked
    act(() => {
      peeked = result.current.peek()
    })

    expect(peeked).toBe(3)
  })

  it('should try to pop a value from an empty array', () => {
    const { result } = renderHook(() => useStack())

    act(() => {
      result.current.pop()
    })

    expect(result.current.isEmpty()).toBeTruthy()
  })

  it('should return correct size', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]))

    expect(result.current.size).toBe(3)
  })
})
