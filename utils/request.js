import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.realworld.io',
  timeout: 10000,
  headers: { Token: '' },
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = Object.assign({}, config.headers, {
      Authorization: `Token `,
    })
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errData =
      error.response && error.response.data
        ? error.response.data
        : error.response
    return Promise.reject(errData)
  }
)

export default request
