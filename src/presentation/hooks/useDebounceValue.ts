/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useDebounceValue = (input: string = '', time: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debounceValue;
};
