import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'Home',
    component:function () {
      return import(/* webpackChunkName: "about" */ '../views/home/Home.vue')
    },
    meta: {
      title: '首页'   
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/departments/Departments.vue')
    },
    meta: {
      title: '选择科室'   
    }
  },
  {
    path:'/queryOrder',
    name:'QueryOrder',
    component:function () {
      return import(/* webpackChunkName: "about" */ '../views/queryOrder/QueryOrder.vue')
    },
    meta: {
      title: '预约查询'   
    }
  },
  {
    path:'/schedule',
    name:'Schedule',
    component:function () {
      return import(/* webpackChunkName: "about" */ '../views/schedule/Schedule.vue')
    },
    meta: {
      title: '选择医师'   
    }
  },
  {
    path:'/docSchedule',
    name:'DocSchedule',
    component:function () {
      return import(/* webpackChunkName: "about" */ '../views/docSchedule/DocSchedule.vue')
    },
    meta: {
      title: '医师排班'   
    }
  },
  {
    path:'/order',
    name:'Order',
    component:function () {
      return import(/* webpackChunkName: "about" */ '../views/order/Order.vue')
    },
    meta: {
      title: '挂号确认'   
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
