import { request } from '@/plugins/request'

export const getTags = () => request.get('/api/tags')
