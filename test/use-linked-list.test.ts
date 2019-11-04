import { renderHook, act } from '@testing-library/react-hooks'
import { useLinkedList } from '../src'

describe('useLinkedList', () => {
  it('should add a value', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))

    expect(result.current[1].size()).toBe(1)
    expect(result.current[0]).toEqual({ data: 1, next: null })
  })

  it('should add a value at an specific index', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].add(3))
    act(() => result.current[1].add(4))
    act(() => result.current[1].addAt(2, 1))

    expect(result.current[1].size()).toBe(4)
    expect(result.current[0]).toEqual({
      data: 1,
      next: {
        data: 2,
        next: {
          data: 3,
          next: {
            data: 4,
            next: null,
          },
        },
      },
    })
  })

  it('should clear all values', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].clear())

    expect(result.current[1].size()).toBe(0)

    expect(result.current[0]).toEqual(null)
  })

  it('should get a value', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))

    expect(result.current[1].get(2)).toEqual({ data: 2, next: null })
  })

  it('should not get a value', () => {
    const { result } = renderHook(() => useLinkedList())

    expect(result.current[1].get(2)).toEqual(null)
  })

  it('should get a value at an specific index', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))

    expect(result.current[1].getAt(1)).toEqual({ data: 2, next: null })
  })

  it('should not get a value at an specific index', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))

    expect(result.current[1].getAt(5)).toEqual(null)
  })

  it('should prepend a value', () => {
    const { result } = renderHook(() => useLinkedList())

    act(() => result.current[1].add(1))
    act(() => result.current[1].prepend(0))

    expect(result.current[1].size()).toBe(2)

    expect(result.current[0]).toEqual({
      data: 0,
      next: {
        data: 1,
        next: null,
      },
    })
  })

  it('should remove a value', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))
    act(() => result.current[1].add(3))
    act(() => result.current[1].remove(2))

    expect(result.current[1].size()).toBe(2)
    expect(result.current[0]).toEqual({
      data: 1,
      next: {
        data: 3,
        next: null,
      },
    })
  })

  it('should remove the first value', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))
    act(() => result.current[1].remove(1))

    expect(result.current[1].size()).toBe(0)
  })

  it('should not remove since there are no values', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].remove(1))

    expect(result.current[1].size()).toBe(0)
  })

  it('should remove the first value', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))
    act(() => result.current[1].add(3))
    act(() => result.current[1].removeAt(0))

    expect(result.current[1].size()).toBe(2)
    expect(result.current[0]).toEqual({
      data: 2,
      next: {
        data: 3,
        next: null,
      },
    })
  })

  it('should remove a value at an specific index', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))
    act(() => result.current[1].add(3))
    act(() => result.current[1].removeAt(1))

    expect(result.current[1].size()).toBe(2)
    expect(result.current[0]).toEqual({
      data: 1,
      next: {
        data: 3,
        next: null,
      },
    })
  })

  it('should not remove at an specific index since there are no values', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].removeAt(1))

    expect(result.current[1].size()).toBe(0)
  })

  it('should get the correct size', () => {
    const { result } = renderHook(() => useLinkedList())
    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))
    act(() => result.current[1].add(3))

    expect(result.current[1].size()).toBe(3)
  })
})
