// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


import App from './App'
import router from './router/index.js'
import './bus'
import currencyFilter from './filters/currency'






Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.use(VueAwesomeSwiper)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})


//用網址切換頁面時會觸發
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  //如果去的頁面是要經過驗證的
  if (to.meta.requiresAuth) {

    //帶入驗證的api
    const api = `${process.env.APIPATH}/api/user/check`;
    const vm = this;
    //無法用vm.$http，因為不在vue裡,是在router下，所以直接用 axios
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    });
  } else {
    next()
  }

})


