import { genString } from '.'

export function generateKey() {
  const ID_SIZE = 6

  return genString(ID_SIZE).toUpperCase()
}

export function generateAvatar(name: string) {
  const url = new URL('https://avatars.dicebear.com/api/initials')
  url.searchParams.append('backgroundColors', 'grey')
  url.searchParams.append('fontSize', '40')
  url.searchParams.append('bold', 'true')
  url.pathname += `/${decodeURI(name)}.svg`

  return url.toString()
}

export function calculateStandardScore(
  betsCount: number,
  hitsCount: number,
  scoreOnZeroBets = false,
) {
  if (betsCount === hitsCount) {
    return scoreOnZeroBets && betsCount === 0 ? 5 : betsCount * 10
  }

  return Math.abs(betsCount - hitsCount) * -10
}

export function calculateSimplifiedScore(
  betsCount: number,
  hitsCount: number,
  scoreOnZeroBets = false,
) {
  if (betsCount !== hitsCount) {
    return -10
  }

  if (scoreOnZeroBets && betsCount === 0) {
    return 5
  }

  return betsCount === 0 ? 0 : 10
}
