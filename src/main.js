import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'
import './icons'

Vue.use(ElementUI);
Vue.use(VCharts)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
