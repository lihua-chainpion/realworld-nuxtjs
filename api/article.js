// 获取公共文章列表
export const getArticles = (axios, params) => {
  return axios.get('/api/articles', {
    params,
  })
}

// 获取关注的用户文章列表
export const getFeedArticles = (axios, params) => {
  return axios.get('/api/articles/feed', {
    params,
  })
}

// 添加点赞
export const addFavorite = (axios, slug) => {
  return axios.post(`/api/articles/${slug}/favorite`)
}

// 取消点赞
export const deleteFavorite = (axios, slug) => {
  return axios.delete(`/api/articles/${slug}/favorite`)
}

// 获取文章详情
export const getArticle = (axios, slug) => {
  return axios.get(`/api/articles/${slug}`)
}

// 获取文章评论
export const getComments = (axios, slug) => {
  return axios.get(`/api/articles/${slug}/comments`)
}
