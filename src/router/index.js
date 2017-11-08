import Vue from 'vue'
import Router from 'vue-router'
import houseKeepingTest from '../components/houseKeepingTest.vue'

Vue.use(Router)

export default new Router({
/*  mode: 'history',*/
  hashbang:false,
  routes: [
    {
      path: '/',
      name: 'houseKeepingTest',
      component: houseKeepingTest
    }
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
