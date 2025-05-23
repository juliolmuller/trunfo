import { genString } from '.';

export function generateKey(): string {
  const ID_SIZE = 6;
  const randomString = genString(ID_SIZE).toUpperCase();

  // Avoid letter "O" in the key to avoid it to be confused with number "0"
  if (randomString.includes('O')) {
    return generateKey();
  }

  return randomString;
}

export function generateAvatar(name: string): string {
  const url = new URL('https://api.dicebear.com/8.x/initials/svg');
  url.searchParams.append('seed', decodeURI(name));
  url.searchParams.append('backgroundColor', '777777');
  url.searchParams.append('fontWeight', '700');

  return url.toString();
}

export function calculateStandardScore(
  betsCount: number,
  hitsCount: number,
  scoreOnZeroBets = false,
): number {
  if (betsCount === hitsCount) {
    return scoreOnZeroBets && betsCount === 0 ? 5 : betsCount * 10;
  }

  return Math.abs(betsCount - hitsCount) * -10;
}

export function calculateSimplifiedScore(
  betsCount: number,
  hitsCount: number,
  scoreOnZeroBets = false,
): number {
  if (betsCount !== hitsCount) {
    return -10;
  }

  if (scoreOnZeroBets && betsCount === 0) {
    return 5;
  }

  return betsCount === 0 ? 0 : 10;
}
