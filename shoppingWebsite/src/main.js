// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'Vuex'
import 'iview/dist/styles/iview.css';
import { Page, Carousel , CarouselItem, Breadcrumb, BreadcrumbItem,Icon } from 'iview';
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Page', Page);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Icon', Icon);



Vue.config.productionTip = false

Vue.prototype.oss = 'http://benhe.oss-cn-shenzhen.aliyuncs.com/';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
       language: true
    },
    mutations: {
       changeLanguage(state, data) {
           state.language = data;
       } 
    }
  });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

