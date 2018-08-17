import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Regist from '@/components/regist'
import Index from '@/components/index'
import Home from '@/components/home'
import Integral from '@/components/integral'
import Shopcar from '@/components/shopcar'
import Mine from '@/components/mine'
import Transfer from '@/components/transfer'
import PackageDetails from '@/components/packageDetails'
import TransferConfirm from '@/components/transferConfirm'

Vue.use(Router)

const router = new Router({
  routes: [
  	{path: '/',name: 'login',component: Login,meta: {title: '登录'}},
    {path: '/regist',name: 'regist',component: Regist,meta: {title: '注册'}},
    {path: '/index',name: 'index',component: Index,meta: {title: '神农牧'}, children:[
    	{path: '/home',name: 'home',component: Home, meta: {title: '神农牧'}},
    	{path: '/integral',name: 'integral',component: Integral, meta: {title: '神农牧'}},
    	{path: '/shopcar',name: 'shopcar',component: Shopcar, meta: {title: '神农牧'}},
    	{path: '/mine',name: 'mine',component: Mine, meta: {title: '神农牧'}}
    ]},
    {path: '/transfer',name: 'transfer',component: Transfer,meta: {title: '转账'}},
    {path: '/packageDetails',name: 'packageDetails',component: PackageDetails,meta: {title: ''}},
    {path: '/transferConfirm',name: 'transferConfirm',component: TransferConfirm,meta: {title: ''}},
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
