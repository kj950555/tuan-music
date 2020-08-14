import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "lib-flexible"

import './element'
// 引入axios
import axios from "axios";
import VueAxios from "vue-axios";

// 引入路由组件
import VueRouter from "vue-router";


// 路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log('全局守卫to==>',to);
//   // console.log('全局守卫from==>',from);
  
// })
// 路由变化跳转页面回到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  
})

Vue.use(VueAxios, axios)


//配置请求基础路径
axios.defaults.baseURL = "http://192.168.90.31:3000";
//配置post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";
// 发起请求之前处理
axios.interceptors.request.use((config) => {
  // 
  if (config.method == "post") {
    let paramsString = "";
    //post请求参数序列化，转成一个字符串
    for (let key in config.data) {
      paramsString += key + "=" + config.data[key] + "&";
    }
    // 
    config.data = paramsString.slice(0, -1);
    // 
  }
  // 把令牌添加到Authorization里面认证
  // config.headers.Authorization = localStorage.getItem('token')
  return config;
});
// 设置重复点击的错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
