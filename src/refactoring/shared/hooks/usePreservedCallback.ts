import { useCallback, useEffect, useRef } from "react";

export function usePreservedCallback<Callback extends Function>(callback?: Callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback<Function>((...args: any[]) => {
    return callbackRef.current?.(...args);
  }, []) as Callback;
}
