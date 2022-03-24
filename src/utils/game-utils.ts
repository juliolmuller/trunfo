import { genString } from '.'

export function generateKey() {
  const ID_SIZE = 6

  return genString(ID_SIZE).toUpperCase()
}

export function generateAvatar(name: string) {
  const url = new URL('https://avatars.dicebear.com/api/initials')
  url.searchParams.append('backgroundColors', 'blue')
  url.searchParams.append('backgroundColors', 'green')
  url.searchParams.append('backgroundColors', 'red')
  url.searchParams.append('backgroundColors', 'yellow')
  url.searchParams.append('fontSize', '40')
  url.searchParams.append('bold', '1')
  url.pathname += `/${decodeURI(name)}.svg`

  return url.toString()
}
