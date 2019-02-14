import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

/*
  进入组件后获取当前城市
  如果更换了城市，下次在进入再获取当前城市对比如果不一样就弹窗
  确定覆盖更换的城市、弹框消失，取消弹框消失
*/

const store = new Vuex.Store({
  state: {
    currentCity: {}, 
    guessCity: {},
    isLogin: false,
    showAlert: false,
    user_info: {},
    shopCart: [],
    goodsList: []
  },
  mutations,
  actions,
  getters
})
export default store
