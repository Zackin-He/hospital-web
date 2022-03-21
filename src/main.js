import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'

import { Button,Search,Calendar,Tab,Tabs,Cell, CellGroup,Field,Toast,Icon ,Empty  ,Dialog   } from 'vant'
import 'vant/lib/index.css'

Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Search);
Vue.use(Calendar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Empty);
Vue.use(Dialog)

//4.引入rem
import '@/config/rem.js'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
