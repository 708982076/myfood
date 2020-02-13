import {create} from 'axios';
import {baseURL} from 'root/config';

const instance = create({baseURL})
const {get} = instance;
instance.interceptors.response.use((res) => {
  return res.data;
}); 

export const getAllCity = () => get('/city');
export const getStoreItem = (id) => get('/storeItem', { params: {id} });
export const getStoreList = (id) => {
  return get('/store', { params: {id} })
};
export const getStoreInfo = (id) => {
  return get('/shopinfo', { params: {id} })
};
export const getStoreComment = (id) => {
  return get('/storecomment', { params: {id} });
};
export const storeWordSerach = (k) => get('/storekeyword', { params: {k} });
