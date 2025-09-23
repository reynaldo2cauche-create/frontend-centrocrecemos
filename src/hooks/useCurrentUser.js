import { useMemo } from 'react';

export function useCurrentUser() {
  return useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }, []);
} 