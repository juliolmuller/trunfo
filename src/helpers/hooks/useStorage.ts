import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const useLocalStorage = makeStorageHook(localStorage);

export const useSessionStorage = makeStorageHook(sessionStorage);

function generateKey(suffix: string): string {
  return `TRUNFO::${suffix}`;
}

function makeStorageHook(storage: Storage) {
  return <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
    if (!key) {
      throw new TypeError('useLocalStorage key may not be falsy');
    }

    const actualKey = generateKey(key);
    const initializer = useRef((key: string) => {
      try {
        const storageValue = storage.getItem(key);

        if (storageValue === null) {
          storage.setItem(key, JSON.stringify(initialValue));

          return initialValue;
        }

        return JSON.parse(storageValue);
      } catch {
        return initialValue;
      }
    });
    const [state, setState] = useState<T>(() => {
      return initializer.current(actualKey);
    });

    const set = useCallback<Dispatch<SetStateAction<T>>>(
      (setStateAction) => {
        const newState =
          typeof setStateAction === 'function'
            ? (setStateAction as (prev: T) => T)(state)
            : setStateAction;
        const value = JSON.stringify(newState);

        storage.setItem(actualKey, value);
        setState(newState);
      },
      [actualKey, setState],
    );

    useLayoutEffect(() => {
      setState(initializer.current(actualKey));
    }, [actualKey]);

    return [state, set];
  };
}
