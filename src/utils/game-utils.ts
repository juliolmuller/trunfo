
export function generateKey() {
  const NUMERIC_BASE = 36
  const AFTER_DOT = 2
  const ID_SIZE = 6

  return Math.random()
    .toString(NUMERIC_BASE)
    .slice(AFTER_DOT, AFTER_DOT + ID_SIZE)
    .toUpperCase()
}
