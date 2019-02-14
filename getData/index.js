import Ojsonp from 'jsonp'
import { request } from '@/config/utils';

let path = "http://localhost:8001/"

export const getHotCity = () => request(path + 'hotCity')
export const getallCity = () => request(path + 'allCity')
export const getCurrentCity = () => request(path + 'currentCity')
export const login = (user) => request(path + 'login', user, 'POST')
export const getSellerInfo = (id) => request(path + 'sellerInfo', {id}) //获取店铺信息
export const getSellerFoodList = (id) => request(path + 'sellerFoodList', {id}) //获取店铺食品
export const getNearbySeller = () => request(path + 'nearbySeller') //获取附近店铺
export const getComment = (id) => request(path + 'comment', {id}) //获取店铺评论
export const jsonp = (url, data, opts) => {
  url = path + url
  function params(data) {
    let url = ''
    for (let key in data) {
      let value = data[key] !== undefined ? data[key] : ''
      url += `&${key}=${encodeURIComponent(value)}`
    }
    return url
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  return new Promise((resolve, reject) => {
    Ojsonp(url, opts, (err, data) => {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}
