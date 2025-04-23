import { useEffect, useRef } from "react";

export const useEffectOnce = (_callback: React.EffectCallback) => {
  const callback = useRef(_callback).current;
  useEffect(callback, [callback]);
};
