import request from '@/utils/request'

export const getTags = () => request.get('/api/tags')
