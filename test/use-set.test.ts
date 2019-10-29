import { renderHook, act } from '@testing-library/react-hooks';
import { useSet } from '../src/use-set';

describe('useSet', () => {
  it('adds a value', () => {
    const { result } = renderHook(() => useSet());

    act(() => {
      result.current.add(3);
    });

    expect(result.current.has(3)).toBe(true);
  });

  it('clears all values', () => {
    const defaultSet = new Set();
    defaultSet.add(3);
    defaultSet.add(5);

    const { result } = renderHook(() => useSet(defaultSet));

    act(() => {
      result.current.clear();
    });

    expect(result.current.has(3)).toBe(false);
    expect(result.current.has(5)).toBe(false);
    expect(result.current.size).toBe(0);
  });

  it('deletes a value', () => {
    const defaultSet = new Set();
    defaultSet.add(3);

    const { result } = renderHook(() => useSet(defaultSet));

    act(() => {
      result.current.delete(3);
    });

    expect(result.current.has(3)).toBe(false);
    expect(result.current.size).toBe(0);
  });
});
