import Vue from 'vue';
import App from './App';
import store from './store';
import router from './pages/router';
import 'lib/rem';

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
