import { useEffect } from "react";
import { useIsFirstRender } from "./useIsFirstRender";

export const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) {
      return effect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
