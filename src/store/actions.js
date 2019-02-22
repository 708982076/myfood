import { getCurrentCity } from 'root/getData'
import { GET_CURCITY } from './mutation-types'
 
export default {
  async getCurrentCity({commit}) {
    const res =  await getCurrentCity()
    let ad_info = res.data.data.ad_info
    ad_info.city = ad_info.city.replace(/市$/, '')
    commit(GET_CURCITY, ad_info)
  }
}