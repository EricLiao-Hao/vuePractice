import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "jquery"
import "bootstrap"
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import './bus.js'
import currencyFilter from './filters/currency'

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.component('Loading' , Loading);
Vue.filter('currency' , currencyFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      axios.post(api).then((response) => {
        if(response.data.success){
          next();
        } else {
          next({
            path:'/login'
          })
        }
      })
    }
   else {
    next();
  }
})
