import axios from 'axios'

export default ({ store }, inject) => {
  const request = axios.create({
    baseURL: 'https://api.realworld.io',
    timeout: 10000,
  })
  // Add a request interceptor
  request.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const { user } = store.state
      if (user && user.token) {
        config.headers = Object.assign({}, config.headers, {
          Authorization: `Token ${user.token}`,
        })
      }
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
      return response ? response.data : response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      let errData = error.response
      if (errData.data) errData = errData.data
      return Promise.reject(errData)
    }
  )
  inject('axios', request)
}
