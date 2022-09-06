import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = (params) => {
  return request.get('/api/articles', {
    params,
  })
}

// 获取关注的用户文章列表
export const getFeedArticles = (params) => {
  return request.get('/api/articles/feed', {
    params,
  })
}
