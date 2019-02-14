import {
  GET_CURCITY,
  SET_CITY,
  LOGIN_STATE
} from './mutation-types'

export default {
  [GET_CURCITY](state, cityObj) {
    state.currentCity = cityObj
  },
  [SET_CITY](state, cityObj) {
    state.guessCity = cityObj
  },
  [LOGIN_STATE](state, isLogin) {
    state.isLogin = isLogin
  }
}
