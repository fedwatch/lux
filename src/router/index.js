import Vue from 'vue'
import Router from 'vue-router'
import houseKeepingTest from '../components/houseKeepingTest.vue'
import notFound from '../components/notFound.vue'

// 关于我们
const aboutUsIndex = () => import('@/views/aboutUs/index');




/*// 提示
 import adviseInfo  from '../views/advise/info.vue';
 // 兑换火券
 import couponInfo  from '../views/coupon/einfo.vue';
 // 收货地址 积分商城
 import creditAddress  from '../views/credit/address.vue';
 // 商品详情 积分商城
 import creditGoods  from '../views/credit/goods.vue';
 // 抽奖结果 积分商城
 import creditLotteryResult  from '../views/credit/lotteryResult.vue';
 // 抽奖纪录 积分商城
 import creditMyLottery  from '../views/credit/myLottery.vue';
 // 积分记录 积分商城
 import creditRecords  from '../views/credit/records.vue';
 // 分享 积分商城
 import creditShare  from '../views/credit/share.vue';
 // 积分商城
 import creditShop  from '../views/credit/shop.vue';
 // 神秘转盘 积分商城
 import creditTurntable  from '../views/credit/turntable.vue';
 // 债权详情
 import debtMyTransferInfo  from '../views/debt/myTransferInfo.vue';
 // 债权列表
 import debtMyTransferList  from '../views/debt/myTransferList.vue';
 // 债权协议
 import debtMyTransferProtocol  from '../views/debt/myTransferProtocol.vue';
 // 债权转让详情
 import debtProjectTransferInfo  from '../views/debt/projectTransferInfo.vue';
 // 保障方式
 import debtTransferGuarantee  from '../views/debt/transferGuarantee.vue';
 // 债权详情
 import debtTransferPersonal  from '../views/debt/transferPersonal.vue';
 // 资金安全
 import debtTransferStudent  from '../views/debt/transferStudent.vue';
 // 项目类型
 import dingqiInvestingWays  from '../views/dingqi/investingWays.vue';
 // 投资记录 定期宝投向 火理财
 import dingqiInvestRecordView  from '../views/dingqi/investRecordView.vue';
 // 债权详情 定期宝 火理财
 import dingqiProjectTransferInfo  from '../views/dingqi/projectTransferInfo.vue';
 // 项目投向 定期宝投向 火理财
 import dingqiTransferListView  from '../views/dingqi/transferListView.vue';
 // 火理财 下载
 import downloadIndex  from '../views/download/index.vue';
 // IOS下载
 import downloadIosDownload  from '../views/download/ios_download.vue';
 // 有温度的移动理财APP
 import downloadLanding  from '../views/download/landing.vue';
 // 如何提升等级 -- 个人设置 -- 火理财
 import helpaccountImproveLevel  from '../views/help/account-improve-level.vue';
 // 等级说明 -- 个人设置 -- 火理财
 import helpAccountLevel  from '../views/help/account-level.vue';
 // 关于SVIP特权 -- 个人设置 -- 火理财
 import helpAccountSvip  from '../views/help/account-svip.vue';
 // 帮助中心--火理财
 import helpCenter  from '../views/help/center.vue';
 // 联系我们--火理财
 import helpContact  from '../views/help/contact.vue';
 // 关于火理财 -- 帮助中心 -- 火理财
 import helpAbout  from '../views/help/help-about.vue';
 // 活动和红包 -- 帮助中心 -- 火理财
 import helpActive  from '../views/help/help-active.vue';
 // 如何抢火券 -- 帮助中心 -- 火理财
 import helpCoupon  from '../views/help/help-coupon.vue';
 // 投资和变现 -- 帮助中心 -- 火理财
 import helpInvest  from '../views/help/help-invest.vue';
 // 收益 -- 帮助中心 -- 火理财
 import helpProfit  from '../views/help/help-profit.vue';
 // 充值和提现--帮助中心--火理财
 import helpRecharge  from '../views/help/help-recharge.vue';
 // 账户安全--帮助中心--火理财
 import helpSafe  from '../views/help/help-safe.vue';
 // 如何获得积分--积分商城--火理财
 import helpIntegralHowGet  from '../views/help/integral-how-get.vue';
 // 项目类型
 import huoqiInvestingWays  from '../views/huoqi/investingWays.vue';
 // 预约记录 -- 零火宝投向 -- 火理财
 import huoqiInvestRecordView  from '../views/huoqi/investRecordView.vue';
 // 项目投向 -- 零火宝投向 -- 火理财
 import huoqiTransferListView  from '../views/huoqi/transferListView.vue';
 // 火理财 - 有温度的移动理财APP
 import indexIndex  from '../views/index/index.vue';
 // 消息
 import messageInfo  from '../views/message/info.vue';
 // 月报--火理财
 import monthreportIndex  from '../views/monthreport/index.vue';
 // 火理财注册协议
 import protocolRegisterProtocol  from '../views/protocol/register_protocol.vue';
 // 火理财 - 注册送豪礼
 import recommendRecommend  from '../views/recommend/recommend.vue';
 // 火理财 - 注册送豪礼 - 成功
 import recommendRegisterSuccess  from '../views/recommend/register_success.vue';
 // 用户登录
 import userLogin  from '../views/user/login.vue';
 // 用户注册
 import userRegister  from '../views/user/register.vue';
 // 火理财 交易记录
 import userTradeListByCheck  from '../views/user/tradeListByCheck.vue';
 // 页面找不到
 import C404  from '../views/404.vue';
 // 公司简介
 import aboutUs  from '../views/aboutUs.vue';
 // 投资记录 -- 投向 -- 火理财
 import getInvestList  from '../views/getInvestList.vue';
 // 债权详情
 import getProductDebtDetail  from '../views/getProductDebtDetail.vue';
 // 项目投向 -- 定期宝投向 -- 火理财
 import getProductDebtList  from '../views/getProductDebtList.vue';
 // 项目类型
 import getProductInvestType  from '../views/getProductInvestType.vue';
 // 火理财 -- 交易记录
 import getUserFundLogList  from '../views/getUserFundLogList.vue';

 import index  from '../views/index.vue';
 // 积分商城--抽奖结果
 import lotteryDetail  from '../views/lotteryDetail.vue';
 // 积分商城--分享
 import lotteryShare  from '../views/lotteryShare.vue';
 // 债权详情
 import myDebtDetail  from '../views/myDebtDetail.vue';
 // 债权列表
 import myDebtList  from '../views/myDebtList.vue';
 // 抽奖记录 -- 积分商城
 import myLottery  from '../views/myLottery.vue';
 // 债权列表
 import myRegularDebtList  from '../views/myRegularDebtList.vue';

 import turntable  from '../views/turntable.vue';*/


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。

const routes =  [
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // } ,
  // {
  //   path: '/lazy-loading',
  //   name: 'lazyLoading',
  //   component: lazyLoading
  // },
  {
    path: '/aboutUsIndex',
    name: 'aboutUsIndex',
    component: aboutUsIndex
  },
  // // 关于
  // {
  //   path: "/about/",
  //   // component:helpCenter,
  //   name: "aboutUsIndex",
  //   children: [
  //     {
  //       path: 'aboutus',
  //       component: aboutUsIndex,
  //       name: "aboutus"
  //     },
  //     {
  //       path: 'adviseInfo',
  //       component: adviseInfo,
  //       name: "adviseInfo"
  //     },
  //     {
  //       path: 'creditAddress',
  //       component: creditAddress,
  //       name: "creditAddress"
  //     },
  //   ]
  // },
  // // 帮助
  // {
  //   path: "/help/",
  //   // component:helpCenter,
  //   name: "helpIndex",
  //   children: [
  //     {
  //       path: 'accountLevel',
  //       component: accountLevel
  //     },
  //     {
  //       path: 'about',
  //       component: helpAbout,
  //       name: "helpAbout"
  //     },
  //   ]
  //
  //
  // },
  // // 推广活动
  // {
  //   path: "/landing/",
  //   // component:helpCenter,
  //   name: "landingIndex",
  //   children: [
  //     {
  //       path: 'couponInfo',
  //       component: couponInfo,
  //       name: "couponInfo"
  //     }
  //   ]
  // },
  // // 火理财
  // {
  //   path: "/hlc/",
  //   // component:helpCenter,
  //   name: "hlcIndex",
  //   children: [
  //     // 交易记录
  //     {
  //       path: 'tradeList',
  //       component: userTradeListByCheck,
  //       name: "userTradeListByCheck"
  //     },
  //
  //     // 注册送豪礼
  //     {
  //       path: 'recommend',
  //       component: recommendRecommend,
  //       name: "recommendRecommend"
  //     },
  //     // {
  //     //     path: 'about',
  //     //     component: helpAbout,
  //     //     name: "helpAbout"
  //     // },
  //   ]
  // },
  // // 积分商城
  // {
  //   path: "/credit/",
  //   // component:helpCenter,
  //   name: "creditIndex",
  //   children: [
  //     {
  //       path: 'accountLevel',
  //       component: accountLevel
  //     },
  //     {
  //       path: 'about',
  //       component: helpAbout,
  //       name: "helpAbout"
  //     },
  //   ]
  //
  //
  // },
  // {
  //   path: "/help/",
  //   // component:helpCenter,
  //   name: "helpIndex",
  //   children: [
  //     {
  //       path: 'accountLevel',
  //       component: accountLevel
  //     },
  //     {
  //       path: 'about',
  //       component: helpAbout,
  //       name: "helpAbout"
  //     },
  //   ]
  //
  //
  // },
  // {
  //   path: "/help/",
  //   // component:helpCenter,
  //   name: "helpIndex",
  //   children: [
  //     {
  //       path: 'accountLevel',
  //       component: accountLevel
  //     },
  //     {
  //       path: 'about',
  //       component: helpAbout,
  //       name: "helpAbout"
  //     },
  //   ]
  // },
  // {
  //   path: "/user/",
  //   // component:helpCenter,
  //   name: "user",
  //   children: [
  //     {
  //       path: 'login',
  //       component: userLogin,
  //       name: "userLogin"
  //     },
  //     {
  //       path: 'register',
  //       component: userRegister,
  //       name: "userRegister"
  //     },
  //   ]
  // },
];

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base:'/',
  routes: [
    {
      path: '/',
      name: 'houseKeepingTest',
      component: houseKeepingTest
    },
    {
      path: '/aboutUsIndex',
      name: 'aboutUsIndex',
      component: aboutUsIndex
    },
    { path: '*', component: notFound }
  ],

  beforeRouteUpdate (to, from, next) {
    // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
    this.$router.isBack = false
    next()
  }
})
