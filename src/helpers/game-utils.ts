import { genString } from '.'

export function generateKey() {
  const ID_SIZE = 6

  return genString(ID_SIZE).toUpperCase()
}

export function generateAvatar(name: string) {
  const url = new URL('https://api.dicebear.com/8.x/initials/svg')
  url.searchParams.append('seed', decodeURI(name))
  url.searchParams.append('backgroundColor', '777777')
  url.searchParams.append('fontWeight', '700')

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
