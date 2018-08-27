// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.$axios = axios

// 全局请求头
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
		if(config.url.indexOf("login") == -1){
	    config.headers['X-With-USER_NAME'] = localStorage.getItem('userName')
	    config.headers['X-With-CLIENTID'] = localStorage.getItem('cookId')
	  }
    return config;
}, function (err) {
    return Promise.reject(err);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	if(response.config.url.indexOf("login") !== -1){
		localStorage.clear()
	}
  return response
}, function (error) {
if (303 == error.response.status) {
    // ElementUI.Message.error("session过期，请登录！");
    localStorage.clear()
    router.push({path: '/login'})
}
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

