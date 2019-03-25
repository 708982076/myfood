import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './root/mutations'
import actions from './root/actions'
import getters from './root/getters'
import state from './root/state'
import modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
export default store
