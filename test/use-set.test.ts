import { renderHook, act } from '@testing-library/react-hooks';
import { useSet } from '../src/use-set';

describe('useSet', () => {
  it('adds a value', () => {
    const { result } = renderHook(() => useSet());

    act(() => {
      result.current[1].add(3);
    });

    expect(result.current[0].has(3)).toBe(true);
  });

  it('clears all values', () => {
    const defaultSet = new Set();
    defaultSet.add(3);
    defaultSet.add(5);

    const { result } = renderHook(() => useSet(defaultSet));

    act(() => {
      result.current[1].clear();
    });

    expect(result.current[0].has(3)).toBe(false);
    expect(result.current[0].has(5)).toBe(false);
    expect(result.current[0].size).toBe(0);
  });

  it('deletes a value', () => {
    const defaultSet = new Set();
    defaultSet.add(3);

    const { result } = renderHook(() => useSet(defaultSet));

    act(() => {
      result.current[1].delete(3);
    });

    expect(result.current[0].has(3)).toBe(false);
    expect(result.current[0].size).toBe(0);
  });
});
