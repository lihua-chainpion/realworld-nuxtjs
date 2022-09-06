export const login = (axios, data) => {
  return axios.post('/api/users/login', data)
}

export const register = (axios, data) => {
  return axios.post('/api/users', data)
}
