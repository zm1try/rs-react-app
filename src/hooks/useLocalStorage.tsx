import { useCallback, useMemo } from 'react';

export const useLocalStorage = (key: string) => {
  const loadSearchQuery = useCallback(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      try {
        return JSON.parse(storageValue);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return null;
  }, [key]);

  const saveSearchQuery = useCallback(
    (value: string) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return useMemo(
    () => ({ loadSearchQuery, saveSearchQuery }),
    [loadSearchQuery, saveSearchQuery]
  );
};
