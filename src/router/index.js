import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Regist from '@/components/regist'
import Agreement from '@/components/agreement'
import Forget from '@/components/forget'
import Change from '@/components/change'
import Index from '@/components/index'
import Home from '@/components/home'
import Integral from '@/components/integral'
import Shopcar from '@/components/shopcar'
import AddList from '@/components/addList'
import Mine from '@/components/mine'
import Setmine from '@/components/setmine'
import About from '@/components/about'
import Revise from '@/components/revise'
import Payment from '@/components/payment'
import Addre from '@/components/addre'
import Pushadd from '@/components/pushadd'
import Addedit from '@/components/addedit'
import Peodata from '@/components/peodata'
import Edit from '@/components/edit'
import Team from '@/components/team'
import Bill from '@/components/bill'
import Detail from '@/components/detail'
import Turnou from '@/components/turnou'
import Explicit from '@/components/explicit'
import Outye from '@/components/outye'
import Outjf from '@/components/outjf'
import Transfer from '@/components/transfer'
import PackageDetails from '@/components/packageDetails'
import TransferConfirm from '@/components/transferConfirm'
import OnlineStore from '@/components/onlineStore'
import GoodDetails from '@/components/goodDetails'
import MyOrder from '@/components/myOrder'
import Tuihuo from '@/components/tuihuo'
import ApplyTuihuo from '@/components/applyTuihuo'
import Unopened from '@/components/unopened'

Vue.use(Router)

const router = new Router({
	mode: 'history',
  routes: [
  	{path: '/',name: 'login',component: Login,meta: {title: '登录'}},
    {path: '/regist',name: 'regist',component: Regist,meta: {title: '注册'}},
    {path: '/agreement',name: 'agreement',component: Agreement,meta: {title: '用户协议'}},
    {path: '/forget',name: 'forget',component: Forget,meta: {title: '忘记密码'}},
    {path: '/change',name: 'change',component: Change,meta: {title: '忘记密码'}},
    {path: '/index',name: 'index',component: Index,meta: {title: ''}, children:[
    	{path: '/home',name: 'home',component: Home, meta: {title: ''}},
    	{path: '/integral',name: 'integral',component: Integral, meta: {title: ''}},
    	{path: '/shopcar',name: 'shopcar',component: Shopcar, meta: {title: ''}},
    	{path: '/mine',name: 'mine',component: Mine, meta: {title: ''}}
    ]},
    {path: '/setmine',name: 'setmine',component: Setmine,meta: {title: '设置'}},
    {path: '/about',name: 'about',component: About,meta: {title: '关于'}},
    {path: '/revise',name: 'revise',component: Revise,meta: {title: '密码修改'}},
    {path: '/payment',name: 'payment',component: Payment,meta: {title: '支付密码'}},
    {path: '/addre',name: 'addre',component: Addre,meta: {title: '收货地址'}},
    {path: '/addedit',name: 'addedit',component: Addedit,meta: {title: '收货地址'}},
    {path: '/addList',name: 'addList',component: AddList,meta: {title: '配送地址'}},
    {path: '/pushadd',name: 'pushadd',component: Pushadd,meta: {title: '添加新地址'}},
    {path: '/peodata',name: 'peodata',component: Peodata,meta: {title: '个人资料'}},
    {path: '/edit',name: 'edit',component: Edit,meta: {title: '修改资料'}},
    {path: '/team',name: 'team',component: Team,meta: {title: '团队情况'}},
    {path: '/bill',name: 'bill',component: Bill,meta: {title: '我的账单'}},
    {path: '/detail',name: 'detail',component: Detail,meta: {title: '账单明细'}},
    {path: '/turnou',name: 'turnou',component: Turnou,meta: {title: '转出'}},
    {path: '/explicit',name: 'explicit',component: Explicit,meta: {title: '转出明细'}},
    {path: '/outye',name: 'outye',component: Outye,meta: {title: '余额转出'}},
 		{path: '/outjf',name: 'outjf',component: Outjf,meta: {title: '积分转余额'}},
    {path: '/transfer',name: 'transfer',component: Transfer,meta: {title: '转账'}},
    {path: '/packageDetails',name: 'packageDetails',component: PackageDetails,meta: {title: ''}},
    {path: '/transferConfirm',name: 'transferConfirm',component: TransferConfirm,meta: {title: ''}},
    {path: '/onlineStore',name: 'onlineStore',component: OnlineStore,meta: {title: '线上商城'}},
    {path: '/goodDetails',name: 'goodDetails',component: GoodDetails,meta: {title: '商品详情'}},
    {path: '/myOrder',name: 'myOrder',component: MyOrder,meta: {title: '我的订单'}},
    {path: '/tuihuo',name: 'tuihuo',component: Tuihuo,meta: {title: '退货单'}},
    {path: '/applyTuihuo',name: 'applyTuihuo',component: ApplyTuihuo,meta: {title: '申请退货'}},
    {path: '/unopened',name: 'unopened',component: Unopened,meta: {title: '暂未开启'}},
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
