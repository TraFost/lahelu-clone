import { useState, useEffect } from 'react';

export default function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const toggle = () => {
    setValue(prev => !prev);
  };

  return [value, toggle] as const;
}
