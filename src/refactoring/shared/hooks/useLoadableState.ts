import { useState } from "react";
import { useEffectOnce } from "./useEffectOnce";
import { usePreservedCallback } from "./usePreservedCallback";

interface LoadableState<TData> {
  data: TData | null;
  error: Error | null;
  idling: boolean;
  loading: boolean;
  succeed: boolean;
  failed: boolean;
}

const handlers = {
  initial: <TData>(initialData: TData | null = null): LoadableState<TData> => ({
    data: initialData,
    error: null,
    idling: true,
    loading: false,
    succeed: false,
    failed: false,
  }),

  load: <TData>(initialData: TData | null = null): LoadableState<TData> => ({
    data: initialData,
    error: null,
    idling: false,
    loading: true,
    succeed: false,
    failed: false,
  }),

  success: <TData>(data: TData): LoadableState<TData> => ({
    data,
    error: null,
    idling: false,
    loading: false,
    succeed: true,
    failed: false,
  }),

  error: <TData>(error: Error): LoadableState<TData> => ({
    error,
    data: null,
    idling: false,
    loading: false,
    succeed: false,
    failed: false,
  }),
};

interface Options<TData extends any> {
  initialData?: TData;
}

export const useLoadableState = <TData = any>(
  _asyncFn: () => Promise<TData>,
  { initialData }: Options<TData> = {},
) => {
  const [state, setState] = useState<LoadableState<TData>>(() => handlers.initial(initialData));

  const asyncFn = usePreservedCallback(_asyncFn);

  const execute = usePreservedCallback(() => {
    setState(handlers.load(initialData));

    Promise.resolve()
      .then(asyncFn)
      .then((result) => setState(handlers.success(result)))
      .catch((error) => {
        setState(handlers.error(error));
      });
  });

  useEffectOnce(() => {
    execute();
    return () => setState(handlers.initial(initialData));
  });

  return { ...state, execute };
};
