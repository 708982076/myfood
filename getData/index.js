import {create} from 'axios';
import {baseURL} from 'root/config';

let instance = create({baseURL})
const {get} = instance;
instance.interceptors.response.use((res) => {
  let {message, code} = res.data;
  if (code == 0) {
    return res.data;
  }else {
    return Promise.reject(message);
  }
}); 

export const getAllCity = () => get('/city');
export const getLocation = (query) => get('/location', {params: {query}});
export const getStoreItem = async (id) => {
  let {data} = await get('/store');
  return { data: data.filter(i => i._id === id)[0] };
};
export const getStoreList = () => get('/store');
export const getStoreInfo = async (id) => {
  let {data} = await get('/storeInfo');
  return { data: data.filter(i => i._id === id)[0] };
};
export const getStoreComment = async (id) => {
  const {data} = await get('/storeComment');
  return {
    data: data.filter(c => c._id === id)[0]
  };
};
export const storeWordSerach = async (keyword) => {
  const {data} = await getStoreList();
  return {
    data: data.filter(store => {
      return store.name.toLowerCase().includes(decodeURIComponent(keyword))
    })
  }
};
