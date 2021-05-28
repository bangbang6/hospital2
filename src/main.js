import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueECharts from 'vue-echarts'
import VCharts from 'v-charts'
Vue.component('v-chart', VueECharts)
Vue.use(ElementUI);
Vue.use(VCharts)

import store from '@/store/index'
import './permision'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
