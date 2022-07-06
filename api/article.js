// import { request } from '@/plugins/request'
import request from '@/utils/request'


// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的用户文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    headers: {
      // 添加用户身份，数据格式：Token空格Token数据
      Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNmMzhmM2QxOWFmYjNhYmI3OTkwZSIsInVzZXJuYW1lIjoiY2FvciIsImV4cCI6MTY2MjE5MzAzOSwiaWF0IjoxNjU3MDA5MDM5fQ.2iQQdas83JZ8SJ-nmgNzKKsIHGnoDYyAN9BuLAauyKk`
    }
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
