function useAuth() {
  const booleans = [true, false]
  const randomIndex = Math.floor(Math.random() * booleans.length)
  const isAuthenticated = booleans[randomIndex]

  return { isAuthenticated }
}

export default useAuth
