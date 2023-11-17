import { useEffect, useMemo, useRef } from "react";
import {
  RecoilState,
  RecoilValueReadOnly,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
} from "recoil";

export function useLoadable<T>(
  state: RecoilState<T> | RecoilValueReadOnly<T>,
  {
    initialValue,
    initialIsLoading = false,
    suspenseError = true,
    keepPreviousValue = false,
  }: {
    initialValue?: T;
    initialIsLoading?: boolean;
    suspenseError?: boolean;
    keepPreviousValue?: boolean;
  } = {}
): [contents: T, loading: boolean, refresher: () => void] {
  const loadable = useRecoilValueLoadable(state);
  const refresher = useRecoilRefresher_UNSTABLE(state);
  const previousValueRef = useRef<T>();

  useEffect(() => {
    if (keepPreviousValue && loadable.state === "hasValue") {
      previousValueRef.current = loadable.contents;
    }
  }, [keepPreviousValue, loadable]);

  const initials = useMemo(() => {
    return {
      value: initialValue ?? undefined,
      isLoading: initialIsLoading ?? undefined,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (loadable.state) {
    case "hasValue":
      return [loadable.contents, false, refresher];
    case "loading":
      return [
        keepPreviousValue ? previousValueRef.current : initials.value,
        true,
        refresher,
      ];
    case "hasError":
      if (!suspenseError) {
        throw loadable.contents;
      }

      return [initials.value, false, refresher];
    default:
      return [initials.value, initials.isLoading, refresher];
  }
}
