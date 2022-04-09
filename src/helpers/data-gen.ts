/* eslint-disable no-magic-numbers */

export function genNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function genString(length = genNumber(0, 10), base = 36 /* [0-9a-z] */) {
  const AFTER_DOT = 2

  return Math.random()
    .toString(base)
    .slice(AFTER_DOT, AFTER_DOT + length)
}

export function genColor(string: string) {
  let color = '#'
  let hash = 0

  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function getInitials(name: string) {
  const words = name.split(' ')
  const firstLetter = words[0][0]
  const lastLetter = words.length > 1 ? words[words.length - 1][0] : ''

  return `${firstLetter}${lastLetter}`
}
