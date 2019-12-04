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
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import timeTransform from './filters/timeTransform'

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.use(VueI18n)



const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  } //這是為了讓使用者離開該欄位時觸發驗證
});
// VeeValidate.Validator.localize('zh_TW' ,zhTW)

Vue.component('Loading' , Loading);
Vue.filter('currency' , currencyFilter);
Vue.filter('time' ,timeTransform);


new Vue({
  router,
  i18n,
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
