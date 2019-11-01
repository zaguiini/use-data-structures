import { renderHook, act } from "@testing-library/react-hooks"
import { useWeakMap } from "../src"

describe("useWeakMap", () => {
  it('should set a correct value', () => {
    let key = {};
    const { result } = renderHook(() => useWeakMap());

    act(() => {
      result.current.set(key, 'test object')
    })

    expect(result.current.has(key)).toBeTruthy()
  })

  it("should get a value", () => {
    let key = {}
    const { result } = renderHook(() => useWeakMap(new WeakMap([[key, 'test']])));

    const value = result.current.get(key)

    expect(value).toBe('test')
  })

  it("should try to get a value", () => {
    let key = {}
    const { result } = renderHook(() => useWeakMap(new WeakMap()));

    const value = result.current.get(key)

    expect(value).toBeUndefined()
  })


  it('should delete a value', () => {
    let key = {}
    const { result } = renderHook(() => useWeakMap(new WeakMap([[key, 'test']])));

    act(() => {
      result.current.delete(key);
    })

    expect(result.current.has(key)).toBeFalsy();
  })

  it('should clear the weakMap', () => {
    const key = {}
    const { result } = renderHook(() => useWeakMap(new WeakMap([[key, 1]])))

    expect(result.current.has(key)).toBeTruthy();

    act(() => {
      result.current.clear();
    })

    expect(result.current.has(key)).toBeFalsy();
  })
})