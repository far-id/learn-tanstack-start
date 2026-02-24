import '@tanstack/react-start/client-only'
import { createClientOnlyFn } from '@tanstack/react-start';

export const loadCounterFn = createClientOnlyFn(() => {
  const storedCounter = localStorage.getItem('counter');
  return storedCounter ? Number.parseInt(storedCounter) : 0;
});
