import { createContext, useContext, useMemo } from "react";

export const createSafeContext = <T extends object | null>(
  rootComponentName: string,
  defaultContext?: T
) => {
  const Context = createContext<T | undefined>(defaultContext);

  const Provider = ({ children, ...rest }: T & { children: React.ReactNode }) => {
    const value = useMemo(() => rest, Object.values(rest)) as T;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useSafeContext = (consumerName: string) => {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return ctx;
  };

  Provider.displayName = rootComponentName + "Provider";

  return [Provider, useSafeContext] as const;
};
