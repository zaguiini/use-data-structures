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

  it('should get a front value', () => {
    const initialValue = [3, 2, 777]

    const { result } = renderHook(() => useDeque(initialValue))

    let front
    act(() => {
      front = result.current.getFront()
    })

    expect(front).toBe(777)
  })

  it('should get a rear value', () => {
    const initialValue = [55, 2, 10, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    let rear
    act(() => {
      rear = result.current.getRear()
    })

    expect(rear).toBe(55)
  })

  it('should insert a front value', () => {
    const initialValue = [3, 2, 1]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.insertFront(55)
    })

    expect(result.current.size).toBe(4)
    expect(result.current.getFront()).toBe(55)
  })

  it('should insert a rear value', () => {
    const initialValue = [3, 2, 1]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.insertRear(55)
    })

    expect(result.current.size).toBe(4)
    expect(result.current.getRear()).toBe(55)
  })

  it('should delete a front value', () => {
    const initialValue = [3, 2, 55, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.deleteFront()
    })

    expect(result.current.size).toBe(3)
    expect(result.current.getFront()).toBe(55)
  })

  it('should delete a rear value', () => {
    const initialValue = [55, 99, 7]

    const { result } = renderHook(() => useDeque(initialValue))

    act(() => {
      result.current.deleteRear()
    })

    expect(result.current.size).toBe(2)
    expect(result.current.getRear()).toBe(99)
  })
})
