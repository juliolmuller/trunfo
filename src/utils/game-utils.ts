import { genString } from '.'

export function generateKey() {
  const ID_SIZE = 6

  return genString(ID_SIZE).toUpperCase()
}
