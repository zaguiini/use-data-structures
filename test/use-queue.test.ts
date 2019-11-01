import { renderHook, act } from '@testing-library/react-hooks';
import { useQueue } from '../src';

describe('useQueue', () => {
  it('should return the correct size', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    expect(result.current.size).toBe(3);
  })

  it('should check empty queue', () => {
    const { result } = renderHook(() => useQueue());

    expect(result.current.isEmpty()).toBeTruthy();
  })

  it("should enqueue a value", () => {
    const { result } = renderHook(() => useQueue());

    act(() => {
      result.current.enqueue(1)
    })

    expect(result.current.size).toBe(1)
  })

  it("should dequeue a value", () => {
    const { result } = renderHook(() => useQueue([5, 6]))

    expect(result.current.size).toBe(2)

    let shifted;
    act(() => {
      shifted = result.current.dequeue();
    })

    expect(shifted).toBe(5)
    expect(result.current.size).toBe(1);
  })

  it("should try to dequeue a value", () => {
    const { result } = renderHook(() => useQueue())

    let shifted;
    act(() => {
      shifted = result.current.dequeue();
    })

    expect(shifted).toBeUndefined();
  })

  it("should check the front value", () => {
    const { result } = renderHook(() => useQueue([5, 6]));

    let front = result.current.front();

    expect(front).toBe(5);
    expect(result.current.size).toBe(2);
  })

  it('should try to check the front value', () => {
    const { result } = renderHook(() => useQueue())

    let front = result.current.front();
    expect(front).toBeUndefined();
  })

  it('should return all values in queue', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    let values = result.current.values();

    expect(values).toEqual(expect.arrayContaining([1, 2, 3]))
  })
})
