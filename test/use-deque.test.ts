import { renderHook, act } from '@testing-library/react-hooks'
import { useDeque } from '../src'

describe('useDeque', () => {
  it('should check the size', () => {
    const { result } = renderHook(() => useDeque([4, 3, 2, 1]))

    expect(result.current.size).toBe(4)
  })

  it('should check an empty deque', () => {
    const { result } = renderHook(() => useDeque())

    expect(result.current.isEmpty()).toBeTruthy()
  })

  it('should check an full deque', () => {
    const { result } = renderHook(() => useDeque([2, 1]))

    expect(result.current.isEmpty()).toBeFalsy()
  })

  it('should peek a front value', () => {
    const initialValue = [3, 2, 777]

    const { result } = renderHook(() => useDeque(initialValue))

    let front
    act(() => {
      front = result.current.peekFront()
    })

    expect(front).toBe(777)
  })

  it('should peek a rear value', () => {
    const initialValue = [55, 2, 10, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    let rear
    act(() => {
      rear = result.current.peekRear()
    })

    expect(rear).toBe(55)
  })

  it('should add a front value', () => {
    const initialValue = [3, 2, 1]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.addFront(55)
    })

    expect(result.current.size).toBe(4)
    expect(result.current.peekFront()).toBe(55)
  })

  it('should add a rear value', () => {
    const initialValue = [3, 2, 1]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.addRear(55)
    })

    expect(result.current.size).toBe(4)
    expect(result.current.peekRear()).toBe(55)
  })

  it('should remove a front value', () => {
    const initialValue = [3, 2, 55, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.removeFront()
    })

    expect(result.current.size).toBe(3)
    expect(result.current.peekFront()).toBe(55)
  })

  it('should remove a rear value', () => {
    const initialValue = [55, 99, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.removeRear()
    })

    expect(result.current.size).toBe(2)
    expect(result.current.peekRear()).toBe(99)
  })

  it('should clear deque', () => {
    const { result } = renderHook(() => useDeque([1, 2, 3]))

    act(() => {
      result.current.clear()
    })

    expect(result.current.isEmpty()).toBeTruthy()
  })
})
