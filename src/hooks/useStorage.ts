import { Dispatch, SetStateAction } from 'react'
import {
  useLocalStorage as useReactUseLocalStorage,
  useSessionStorage as useReactUseSessionStorage,
} from 'react-use'

type UseStorageReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  () => void
]

function generateKey(suffix: string) {
  return `TRUNFO::${suffix}`
}

export function useLocalStorage<T>(keySuffix: string, initialValue: T): UseStorageReturn<T> {
  const storageKey = generateKey(keySuffix)
  const useStorageReturn = useReactUseLocalStorage(storageKey, initialValue)

  return useStorageReturn as any
}

export function useSessionStorage<T>(keySuffix: string, initialValue: T): UseStorageReturn<T> {
  const storageKey = generateKey(keySuffix)
  const useStorageReturn = useReactUseSessionStorage(storageKey, initialValue)

  return useStorageReturn as any
}
