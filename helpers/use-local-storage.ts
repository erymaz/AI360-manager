import { useEffect, useState } from "react";

export function useLocalStorage<T extends any>(key: string, defaultValue?: T) {
  const [value, setStateValue] = useState<T>(defaultValue ?? ({} as T));

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setStateValue(stored ? JSON.parse(stored) : defaultValue ?? {});
  }, [defaultValue, key, setStateValue]);

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStateValue(value);
  };

  return [value, setValue] as const;
}
