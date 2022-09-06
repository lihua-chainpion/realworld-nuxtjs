// 获取公共文章列表
export const getArticles = (request, params) => {
  return request.get('/api/articles', {
    params,
  })
}

// 获取关注的用户文章列表
export const getFeedArticles = (request, params) => {
  return request.get('/api/articles/feed', {
    params,
  })
}

// 添加点赞
export const addFavorite = (request, slug) => {
  return request.post(`/api/articles/${slug}/favorite`)
}

// 取消点赞
export const deleteFavorite = (request, slug) => {
  return request.delete(`/api/articles/${slug}/favorite`)
}

// 获取文章详情
export const getArticle = (request, slug) => {
  return request.get(`/api/articles/${slug}`)
}

// 获取文章评论
export const getComments = (request, slug) => {
  return request.get(`/api/articles/${slug}/comments`)
}
