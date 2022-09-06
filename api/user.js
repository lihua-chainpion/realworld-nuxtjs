export const login = (request, data) => {
  return request.post('/api/users/login', data)
}

export const register = (request, data) => {
  return request.post('/api/users', data)
}
