import { MutableRefObject, useEffect, useRef } from "react";

export function usePrevious<T>(value?: T | null) {
  const ref = useRef() as MutableRefObject<T>;
  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);
  return ref.current;
}