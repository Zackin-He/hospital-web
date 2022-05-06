import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'amfe-flexible'
import VueWechatTitle from 'vue-wechat-title'

import { Button,Search,Calendar,Tab,Tabs,Cell, Form,CellGroup,Field,Toast,Icon ,Empty  ,Dialog ,SwipeCell,Popup  } from 'vant'
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
Vue.use(SwipeCell)
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Form)

//4.引入rem
import '@/config/rem.js'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
