import { genString } from '.'

export function generateKey() {
  const ID_SIZE = 6

  return genString(ID_SIZE).toUpperCase()
}

export function generateAvatar(name: string) {
  const url = new URL('https://avatars.dicebear.com/api/initials')
  url.searchParams.append('backgroundColors', 'grey')
  url.searchParams.append('fontSize', '40')
  url.searchParams.append('bold', '1')
  url.pathname += `/${decodeURI(name)}.svg`

  return url.toString()
}
