<template>
  <div id="houseKeepingTest">
    <!--h5 Start-->
    <div class="houseKeepingIndex page" v-show="houseKeepingIndex == true" @touchmove="beginTest()">
      <div class="box1">
        <div class="hospital shake-slow shake-constant"></div>
        <div class="bigTitle"></div>
        <div class="sound" :class="PlayState ? 'start' : 'stop' " @click="changePlayState()"></div>
      </div>
      <div class="box2">
        <div class="girl "></div>
      </div>
      <div class="box3">
        <div class="ask ">
          <div class="arrow"></div>
          <div class="ask-n"></div>
        </div>
      </div>
    </div>
    <!--test start -->
    <div class="houseKeepingTest page " :class="houseKeepingTest ? 'animated fadeInRightBig':''"
         v-show="houseKeepingTest == true">
      <div class="sound" :class="PlayState ? 'start' : 'stop' " @click="changePlayState()"></div>

      <div class="water" style="position: absolute;z-index:1;"></div>
      <div class="testPage_top" style="position: absolute;">
        <div class="goldicon"></div>
      </div>

      <div class="testPage_body" style="position: absolute;z-index:5;">
        <div v-for="(t,index) in test" v-show="currentTest == t.id" class="mainTest" style="">
          <div class="question">
            <p><span class="qNumber">{{index + 1}}、</span>{{t.qTitle}}</p>
            <span v-if="t.qImg"><img :src=t.qImg :alt=t.qTitle></span>
          </div>

          <div class="answer">
            <ul>

              <li :class='{active:d.selected === true}' v-for="(d,key,index) in t.a"
                  v-if="!t.imgData && d.title && !t.columnStyle"
                  :data-score=d.score
                  @click="recordScore(d.score,key,d.selected,currentTest)">
                <p><span>{{d.icon}}.</span> {{d.title}} </p>
              </li>

              <li :class='{active:d.selected === true}' v-for="(d,key,index) in t.a" v-if="t.imgData  && !t.columnStyle"
                  :data-score=d.score
                  @click="recordScore(d.score,key,d.selected,currentTest)">
                <img :src=d.img :alt=d.title>
              </li>


              <li class="columnStyle" :class='{active:d.selected === true}' v-for="(d,key,index) in t.a"
                  v-if="t.imgData && t.columnStyle"
                  :data-score=d.score
                  @click="recordScore(d.score,key,d.selected,currentTest)">
                <p class="columnStyle"><span>{{d.icon}}.</span> {{d.title}} </p>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <div class="testPage_bottom" style="z-index:99;">
        <div class="pig" style="z-index:99;"></div>
        <div class="girl2" style="z-index:99;">
          <div class="leftEye"></div>
          <div class="rightEye"></div>
        </div>
      </div>
    </div>

    <!--result-->
    <div class="houseKeepingResult page" v-show="houseKeepingResult == true">
      <div class="hkr_header">
        <div class="share shake-slow shake-constant" @click="shareFriendWithPyq()"></div>
      </div>

      <div class="hkr_body">
        <h1 class="bodyTxt" :data-value=currentScore><span>{{currentScore}}</span>分</h1>
        <div class="bodyStyle" v-if="this.currentScore > 70">
          <div class="top3"></div>
        </div>
        <div class="bodyStyle" v-else-if="this.currentScore > 40 && this.currentScore <= 70">
          <div class="top2"></div>
        </div>
        <div class="bodyStyle" v-else="this.currentScore > 0 && this.currentScore <= 40">
          <div class="top1"></div>
        </div>
      </div>

      <div class="hkr_footer">
        <button @click="goBackTest()" class="button"></button>
      </div>
    </div>


    <audio id="music" :autoplay='PlayState == true' controls loop>
      <source src="/static/music/PianoMan.mp3" type="audio/mp3">
      您的浏览器不支持背景音乐播放。
    </audio>

    <input type="hidden"  />
  </div>
</template>

<script>

  /*
   beforeCreate    组件实例刚刚被创建,属性都没有
   created    实例已经创建完成，属性已经绑定
   beforeMount    模板编译之前
   mounted    模板编译之后，代替之前ready  *
   beforeUpdate    组件更新之前
   updated    组件更新完毕    *
   beforeDestroy    组件销毁前
   destroyed    组件销毁后
   */
  import $ from "n-zepto";
  import "swiper";
  import rem  from "../../static/utils/resetRem";
  //  import appShare  from "../../static/utils/appShare";
  //  require("");
  //  require("/static/utils/resetRem");

  export default {
    name: 'HouseKeepingTest',
    data () {
      return {
        testState:false,
        number: 0,
        currentScore: 0,
        currentTest: 0,
        PlayState: false,
        cIcon: [
          "A",
          "B",
          "C",
          "D"
        ],
        test: [
          {
            id: 0,
            imgData: true,
            columnStyle: false,
            qTitle: "品酒（装X）大会上，你碰到了许久未见的薇薇安，眼尖的你一眼就看出她身上的这件是A货",
            qImg: "",
            a: [
              {icon: "A", title: "爱马仕 logo 图", img: "/static/images/Hermes.jpg", score: 10, selected: false},
              {icon: "B", title: "博柏利 logo 图", img: "/static/images/burberry.jpg", score: 6, selected: false},
              {icon: "C", title: "Prada logo 图", img: "/static/images/prada.jpg", score: 6, selected: false},
              {icon: "D", title: "香奈儿 logo 图", img: "/static/images/chanel.jpg", score: 6, selected: false}
            ]
          },
          {
            id: 1,
            columnStyle: true,
            imgData: true,
            qTitle: "凯莉四处炫耀最近新买的包包，但是竟然连品牌名都读错了，机智的你知道它念",
            qImg: "/static/images/q2.png",
            a: [
              {icon: "A", title: "梵哲希", img: "", score: 6, selected: false},
              {icon: "B", title: "范思哲", img: "", score: 10, selected: false},
              {icon: "C", title: "纪梵希", img: "", score: 6, selected: false},
              {icon: "D", title: "维萨西", img: "", score: 6, selected: false}
            ]
          },
          {
            id: 2,
            imgData: false,
            columnStyle: false,
            qTitle: "终于迎来已久的休假，和亲爱的TA约定去普吉岛度假，TA说你来安排住宿，你会选",
            qImg: "",
            a: [
              {icon: "A", title: "难得度假，当然选超五星了", img: "", score: 10, selected: false},
              {icon: "B", title: "选个性价比高的民宿，经济又好玩儿", img: "", score: 8, selected: false},
              {icon: "C", title: "景点是重点，住经济酒店就可以了", img: "", score: 6, selected: false},
              {icon: "D", title: "度完假还要生活，能省一点是一点，青旅吧", img: "", score: 4, selected: false}
            ]
          },
          {
            id: 3,
            imgData: false,
            columnStyle: false,
            qTitle: "你的同事小明想买iphone8，想问你要不要一起买，你回答",
            qImg: "",
            a: [
              {icon: "A", title: "劳资已经预约了iPhone X", img: "", score: 10, selected: false},
              {icon: "B", title: "好啊，我的7plus已经用了大半年，该淘汰了", img: "", score: 8, selected: false},
              {icon: "C", title: "不用了，我的手机才用了1年", img: "", score: 6, selected: false},
              {icon: "D", title: "不用了，只要手机还能用我就不会换的", img: "", score: 4, selected: false}
            ]
          },
          {
            id: 4,
            imgData: false,
            columnStyle: false,
            qTitle: "又到了一月一度的工资日，看着进账的工资，你在想",
            qImg: "",
            a: [
              {icon: "A", title: "还完信用卡，这个月又要吃土了", img: "", score: 10, selected: false},
              {icon: "B", title: "留出这个月的生活费，剩下的可以买心仪的宝贝咯", img: "", score: 8, selected: false},
              {icon: "C", title: "把一部分钱存入银行定期，剩下的放卡上以备不时之需", img: "", score: 6, selected: false},
              {icon: "D", title: "找个靠谱的理财工具，一部分存入定期计划，一部分放在变现灵活的产品，既能随时使用又有可观收益", img: "", score: 4, selected: false}
            ]
          },
          {
            id: 5,
            imgData: false,
            columnStyle: false,
            qTitle: "又到了秋冬换季时，整理完衣柜的你想",
            qImg: "",
            a: [
              {icon: "A", title: "去年的衣服都过时了，全部扔掉换成最新款", img: "", score: 10, selected: false},
              {icon: "B", title: "大部分还能穿，今年只要再买几件大衣就可以了", img: "", score: 8, selected: false},
              {icon: "C", title: "把不想穿的卖掉，再添件大衣", img: "", score: 6, selected: false},
              {icon: "D", title: "保暖够用了，不需要买", img: "", score: 4, selected: false}
            ]
          },
          {
            id: 6,
            imgData: true,
            columnStyle: false,
            qTitle: "恰逢去巴黎出差，女朋友千叮咛万嘱咐要一只“姨妈色”的口红，所以你选了",
            qImg: "",
            a: [
              {icon: "A", title: "", img: "/static/images/u114.jpg", score: 6, selected: false},
              {icon: "B", title: "", img: "/static/images/u116.jpg", score: 6, selected: false},
              {icon: "C", title: "", img: "/static/images/u118.jpg", score: 10, selected: false},
              {icon: "D", title: "", img: "/static/images/u120.jpg", score: 6, selected: false}
            ]
          },
          {
            id: 7,
            imgData: false,
            columnStyle: false,
            qTitle: "TA来挑选结婚当天的礼服，营业员热情地拿出四款不同档次的礼服，你选择了",
            qImg: "",
            a: [
              {icon: "A", title: "买下高级定制礼服，日后留个纪念", img: "", score: 10, selected: false},
              {icon: "B", title: "租了高级定制礼服，既然只穿一次，就租最好的", img: "", score: 8, selected: false},
              {icon: "C", title: "买下普通礼服，既可以作为纪念品，又经济实惠", img: "", score: 6, selected: false},
              {icon: "D", title: "租个差不多的就行了，结婚只是形式不重要", img: "", score: 4, selected: false}
            ]
          },
        ],
        result: {
          v70: {resultTitle: "败家体", resultDescription: "人生格言：将品质（装x）进行到底<br>火理财，专治“败家“后遗症。"},
          v40: {resultTitle: "混合体", resultDescription: "人生格言：既能貌美如花（英俊潇洒），又能赚钱养家，说的就是你吧！<br>火理财，给你的潇洒一个理由！"},
          v0: {resultTitle: "持家体", resultDescription: "人生格言：居家必备型良友，理性的你日后定是人生赢家！<br>火理财，你的“持家”小助手！"},
        },
        shareFriend: {
          testState: {
            text: "测测你是\"败家体\"还是\"持家体\""
          },
          v70: {
            text: "资深败家喵在此，快来测测你的属性！"
          },
          v40: {
            text: "我是优质混合体，你是什么体？"
          },
          v0: {
            text: "我是深度持家体，你是什么体？"
          },
        },
        houseKeepingIndex: true,
        houseKeepingTest: false,
        houseKeepingResult: false,
      }
    },
    methods: {
      changePlayState(){
        this.PlayState = !this.PlayState;
        let music = document.getElementById("music");
        if (this.PlayState == true) {
          music.play();
        } else {
          music.pause();
        }
      },
      beginTest(){
//        console.log("beginTest")
        this.houseKeepingIndex = false;
        this.houseKeepingTest = true;
        this.houseKeepingResult = false;
        this.testState = true;

//        console.log(this.test)
      },
      /**
       * 不服再战
       */
      goBackTest(){
        this.currentScore = 0;
        this.currentTest = 0;
        this.houseKeepingIndex = false;
        this.houseKeepingTest = true;
        this.houseKeepingResult = false;
        this.PlayState = false;
        this.testState = false;
        Object.assign(this.$data, this.$options.data())
      },
      /**
       * 戳这里 分享朋友圈
       */
      shareFriendWithPyq(){
        console.log("shareFriendWithPyq")
        wx.ready(function () {
          if (this.currentScore > 70) {
//            this.result.v70
            alert("v70")
            wx.onMenuShareTimeline({
              title: this.shareFriend.v70.text, // 分享标题
              link: location.href,
              imgUrl: "/static/assets/bigTitle.png" // 分享图标
            });
          }else if (this.currentScore > 40 && this.currentScore <= 70){
            alert("v40")
            wx.onMenuShareTimeline({
              title: this.shareFriend.v40.text, // 分享标题
              link: location.href,
              imgUrl: "分享图标的url,以http或https开头" // 分享图标
            });
          }else{
            alert("v0")
            wx.onMenuShareTimeline({
              title: this.shareFriend.v0.text, // 分享标题
              link: location.href,
              imgUrl: "分享图标的url,以http或https开头" // 分享图标
            });
          }
        })

      },
      recordScore(s, index, selected, currentTest){
//        this.$set(this.test[index])
        let _this = this;
        this.test[currentTest].a[index].selected = !selected;

        setTimeout(function () {
          if (_this.currentScore > 80) {
            alert("游戏出bug了");
            return;
          }
          _this.currentScore = _this.currentScore + parseInt(s);
          _this.currentTest += 1;

          console.log(_this.currentScore);

          if (_this.currentTest == 8) {
            _this.houseKeepingIndex = false;
            _this.houseKeepingTest = false;
            _this.houseKeepingResult = true;
            _this.PlayState = false;
            var music = document.getElementById("music");
            music.pause();

          }
        }, 500)
      }

    },
    computed: {
      // 一个计算属性的 getter
      process: function () {
        // `this` 指向 vm 实例
        return this.currentScore + 1
      }
    },

    beforeCreate: function () {

    },
    cteated: function () {

    },
    beforeMount: function () {

    },
    mounted: function () {
      console.log("mounted")
      rem.resetRem();
      this.PlayState = true;

//      appShare('shareBtn', { //H5按钮的分享
//        shareTip: 'test',
//        title: '呼朋唤友，fun肆一夏！你的好友邀请你来领礼包啦~',
//        content: '1%加息券，一键即可领取，任意首投还送9888元体验金',
//        url: 'http://139.129.110.155/recommend/recommend',
//        imgUrl: 'http://139.129.110.155/static/images/global/share_logo.jpg',
//        shareTypes: ['weixinFriends', 'QQFriends']
//      })


      // 微信配置
      wx.config({
        debug: false,
        appId: "wxa9d50133df6af1fd",
        timestamp: '上一步生成的时间戳',
        nonceStr: '上一步中的字符串',
        signature: '上一步生成的签名',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
      });

      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
      wx.ready(function () {

        var music = document.getElementById("music");
        music.src = "/static/music/PianoMan.mp3"
        music.play();

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
          title: '分享标题', // 分享标题
          link: location.href,
          imgUrl: "/static/assets/bigTitle.png" // 分享图标
        });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
          title:this.shareFriend.testState.text, // 分享标题
          desc: "分享描述", // 分享描述
          link: location.href,
          imgUrl: "/static/assets/bigTitle.png", // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
        });
      });

    },
    beforeUpdate: function () {

    },
    updated: function () {

    },
    beforeDestroy: function () {

    },
    destroyed: function () {

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  #app {
    height: 100%;
  }

  #houseKeepingTest {
    height: 100%;
  }

  .sound {
    background: url("../../static/assets/sound_on.png") no-repeat;
    background-size: 100% 100%;
    width: 76rem/@rem;
    height: 59rem/@rem;

    position: absolute;
    top: 10rem/@rem;
    right: 10rem/@rem;

    &.start {

      animation: rotateMotion 2s infinite;
      -moz-animation: rotateMotion 2s infinite;
      -webkit-animation: rotateMotion 2s infinite;
      -o-animation: rotateMotion 2s infinite;
    }

    &.stop {
      background: url("../../static/assets/sound_off.png") no-repeat;
      background-size: 100% 100%;
      width: 61rem/@rem;
      height: 54rem/@rem;
      position: absolute;

      top: 15rem/@rem;
      right: 15rem/@rem;
    }

  }

  @rem: 46.875;
  @disance-left: -10px;
  @disance-right: 10px;

  @font-face {
    font-family: "pangmen";
    src: url('../../static/fonts/pangmen.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
  }

  html, body {
    font-size: 16px;
    height: 100%;
    overflow: hidden;
    background: url("../../static/assets/2bg.png") no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*第一幕*/
  .houseKeepingIndex {
    background: url("../../static/assets/bg.png") no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    height: 100%;

    .box1 {
      width: 100%;
      text-align: center;
      height: 40%;
    }
    .box2 {
      width: 100%;
      text-align: center;
      height: 20%;
    }
    .box3 {
      width: 100%;
      text-align: center;
      height: 40%;
    }

    .bigTitle {
      background: url("../../static/assets/bigTitle.png") no-repeat;
      background-size: 100% 100%;
      width: 667rem/@rem;
      height: 480rem/@rem;

      margin: 10rem/@rem auto;

      /*margin: 50rem/@rem 18rem/@rem;*/

      animation: bigMotion2 2s infinite;
      -moz-animation: bigMotion2 2s infinite;
      -webkit-animation: bigMotion2 2s infinite;
      -o-animation: bigMotion2 2s infinite;

      /*animation: big 5s infinite;*/
      /*-moz-animation: titleMotion 5s infinite;*/
      /*-webkit-animation: titleMotion 5s infinite;*/
      /*-o-animation: titleMotion 5s infinite;*/
    }

    .girl {
      background: url("../../static/assets/girl.png") no-repeat;
      background-size: 100% 100%;
      width: 121rem/@rem;
      height: 150rem/@rem;

      /*
      margin-top: -25rem/@rem;
      margin-left: 175rem/@rem;
      */
      margin-left: 175rem/@rem;
      margin-top: 25rem/@rem;

    }

    .ask {
      width: 508rem/@rem;
      height: 126rem/@rem;
      margin: 115rem/@rem auto;
      text-align: center;
    }

    .arrow {
      background: url("../../static/assets/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 259rem/@rem;
      height: 118rem/@rem;
      /*
      position: absolute;
      bottom: 190rem/@rem;
      left: 130rem/@rem;
      */
      float: left;

      animation: transX 1.5s infinite;
      -moz-animation: transX 1.5s infinite;
      -webkit-animation: transX 1.5s infinite;
      -o-animation: transX 1.5s infinite;
    }
    .ask-n {
      background: url("../../static/assets/ask-n.png") no-repeat;
      background-size: 100% 100%;
      width: 208rem/@rem;
      height: 114rem/@rem;
      float: right /*
      position: absolute;
      bottom: 200rem/@rem;
      right: 130rem/@rem;
      */
    }

    .hospital {
      background: url("../../static/assets/hospital.png") no-repeat;
      background-size: 100% 100%;
      width: 97rem/@rem;
      height: 97rem/@rem;

      position: absolute;
      left: 20rem/@rem;
      top: 45rem/@rem;

      animation: bigMotion 3s infinite;
      -moz-animation: bigMotion 3s infinite;
      -webkit-animation: bigMotion 3s infinite;
      -o-animation: bigMotion 3s infinite;
    }

  }

  /*第二幕*/

  .houseKeepingTest {
    /*background: url("../../static/assets/2bg.png") no-repeat;*/
    background-size: 100% 100%;
    background-attachment: fixed;
    z-index: 1;
  }

  .testPage_top {
    z-index: 3;
  }

  .water {
    background: url("../../static/assets/water_1.png") no-repeat;
    background-size: 100% 100%;
    width: 442rem/@rem;
    height: 895rem/@rem;

    position: absolute;
    top: -20rem/@rem;
    left: -5rem/@rem;

    animation: waterAnimate 3s infinite;
    -moz-animation: waterAnimate 3s infinite;
    -webkit-animation: waterAnimate 3s infinite;
    -o-animation: waterAnimate 3s infinite;
    z-index: 2;
  }

  .goldicon {
    background: url("../../static/assets/goldcoin.png") no-repeat;
    background-size: 100% 100%;

    width: 169rem/@rem;
    height: 169rem/@rem;
    position: absolute;
    left: 330rem/@rem;
    top: 79rem/@rem;
    z-index: 2;

    animation: goldicon 3s infinite;
    -moz-animation: goldicon 3s infinite;
    -webkit-animation: goldicon 3s infinite;
    -o-animation: goldicon 3s infinite;
  }

  .mainTest {
    padding: 153.5rem/@rem 50rem/@rem;
    z-index: 10;
  }

  .testPage_body {
    background: url("../../static/assets/test_body.png") no-repeat;
    background-size: 100% 100%;
    width: 656rem/@rem;
    height: 865rem/@rem;
    margin: 150rem/@rem 50rem/@rem;
    z-index: 5;
  }

  .testPage_bottom {

  }

  .question {
    span {
      img {
        width: 186rem/@rem;
        height: 232rem/@rem;
      }
    }

  }

  .question p {
    font-family: "Microsoft YaHei UI";
    font-weight: bold;
    padding: 25rem/@rem 0;
    line-height: 40rem/@rem;
    text-align: left;
  }

  .qNumber {
    text-align: center;
    padding: 0 14rem/@rem;
  }

  .answer {
    z-index: 99;
    ul {
      list-style: none;
      line-height: 30rem/@rem;
      padding: 0rem/@rem 15rem/@rem;
      li {
        background: url("/static/assets/unselected.png") no-repeat left center;
        background-size: 10% auto;
        width: 80%;
        height: 20rem/@rem;
        margin: 40rem/@rem 0 50rem/@rem 0;
        padding: 20rem/@rem 25rem/@rem;
        text-align: left;
        vertical-align: middle;

        &:before {
          background: url("/static/assets/unselected.png") no-repeat left center;
          background-size: 10% auto;
          padding: 0 20rem/@rem;
          width: 20rem/@rem;
          height: 20rem/@rem;
        }
        &.active {
          display: block;
          background: url("/static/assets/selected.png") no-repeat left center;
          background-size: 10% auto;
          width: 80%;
          height: 20rem/@rem;
          margin: 40rem/@rem 0 50rem/@rem 0;
          padding: 20rem/@rem 25rem/@rem;
        }
        &.columnStyle {
          background: url("/static/assets/unselected.png") no-repeat left center;
          background-size: 18% auto;
          width: 40%;
          height: 20rem/@rem;
          margin: 15rem/@rem 0rem/@rem;
          padding: 25rem/@rem 20rem/@rem;
          float: left;
          &.active {
            background: url("/static/assets/selected.png") no-repeat left center;
            background-size: 18% auto;
            width: 40%;
            height: 20rem/@rem;
            margin: 15rem/@rem 0rem/@rem;
            padding: 25rem/@rem 20rem/@rem;
            float: left;
          }
        }
        img {
          line-height: 30rem/@rem;
          width: 180rem/@rem;
          margin-left: 65rem/@rem;
          margin-top: -20rem/@rem;
        }
        p {
          width: 100%;
          padding: 0 40rem/@rem;
          margin-top: -3px;
          line-height: 35rem/@rem;
          &.columnStyle {
            width: 100%;
            text-align: center;
            padding: 0rem/@rem 20rem/@rem;
            line-height: 0.74666667rem;
          }
        }
      }
    }

  }

  .testPage_bottom {
    .pig {
      position: absolute;
      bottom: 3.5rem/@rem;
      right: 150rem/@rem;
      background: url("../../static/assets/pig.png") no-repeat;
      background-size: 100% 100%;
      width: 211rem/@rem;
      height: 235rem/@rem;
      z-index: 99;
    }
    .girl2 {
      position: absolute;
      bottom: 3.5rem/@rem;
      right: 5rem/@rem;
      background: url("../../static/assets/2stgirl.png") no-repeat;
      background-size: 100% 100%;
      width: 208rem/@rem;
      height: 316rem/@rem;

      .leftEye {
        position: absolute;
        top: 65rem/@rem;
        right: 120rem/@rem;
        background: url("../../static/assets/leftEye.png") no-repeat;
        background-size: 100% 100%;
        width: 51rem/@rem;
        height: 44rem/@rem;

        animation: eyeAni 1s infinite;
        -moz-animation: eyeAni 1s infinite;
        -webkit-animation: eyeAni 1s infinite;
        -o-animation: eyeAni 1s infinite;

      }
      .rightEye {
        position: absolute;
        top: 65rem/@rem;
        right: 60rem/@rem;
        background: url("../../static/assets/rightEye.png") no-repeat;
        background-size: 100% 100%;
        width: 53rem/@rem;
        height: 47rem/@rem;

        animation: eyeAni 1s infinite;
        -moz-animation: eyeAni 1s infinite;
        -webkit-animation: eyeAni 1s infinite;
        -o-animation: eyeAni 1s infinite;
      }
    }
  }

  /*第三幕*/
  .houseKeepingResult {
    background: url("../../static/assets/2bg.png") no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    .hkr_header {
      .share {
        background: url("../../static/assets/share.png") no-repeat;
        background-size: 100% 100%;
        width: 191rem/@rem;
        height: 155rem/@rem;
        position: absolute;
        right: 0rem/@rem;
        top: 10rem/@rem;
      }
    }

    .hkr_body {
      background: url("../../static/assets/bg3.png") no-repeat;
      background-size: 100% 100%;
      width: 671rem/@rem;
      height: 853rem/@rem;
      text-align: center;
      margin: 150rem/@rem auto 45rem/@rem auto;

      h1.bodyTxt {
        font-family: "pangmen";
        padding-top: 220rem/@rem;
        padding-bottom: 0rem/@rem;
        font-size: 65rem/@rem;
        color: rgb(246, 60, 84);
        span {
          font-family: "pangmen";
          font-size: 100rem/@rem;
          color: rgb(246, 60, 84);
          padding: 0 15rem/@rem;
          letter-spacing: 10rem/@rem;
        }
      }
      .bodyStyle {
        padding: 10rem/@rem 90rem/@rem;
      }

      .top1 {
        background: url("../../static/assets/top1.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 35rem/@rem auto;

      }
      .top2 {
        background: url("../../static/assets/top2.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 35rem/@rem auto;

      }
      .top3 {
        background: url("../../static/assets/top3.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 35rem/@rem auto;

      }
    }
    .button {
      background: url("../../static/assets/button.png") no-repeat;
      background-size: 100% 100%;
      width: 394rem/@rem;
      height: 175rem/@rem;
      margin: 0rem/@rem auto;
    }
  }

  /*动画区*/
  @keyframes change {
    from {
      width: 100px;
      height: 100px;
      opacity: 1;
    }
    to {
      width: 500px;
      height: 500px;
      opacity: 0;
    }
  }

  @keyframes waterAnimate {
    20% {
      background: url("../../static/assets/water_1.png") no-repeat;
      background-size: 100% 100%;
      width: 442rem/@rem;
      height: 895rem/@rem;
      z-index: 1;
    }
    70% {
      background: url("../../static/assets/water_2.png") no-repeat;
      background-size: 100% 100%;
      width: 442rem/@rem;
      height: 895rem/@rem;
      z-index: 1;
    }
    100% {
      background: url("../../static/assets/water_3.png") no-repeat;
      background-size: 100% 100%;
      width: 442rem/@rem;
      height: 895rem/@rem;
      z-index: 1;
    }
  }


  /*
  @-webkit-keyframes waterAnimate {
    0% {
      background: url("../../static/assets/water_1.png") no-repeat;
      background-size: 100% 100%;
      width: 442rem/@rem;
      height: 895rem/@rem;
      /*z-index: 1;*/
  /*}
 50% {
   background: url("../../static/assets/water_2.png") no-repeat;
   background-size: 100% 100%;
   width: 442rem/@rem;
   height: 895rem/@rem;
   /*z-index: 1;*/
  /*}
 100% {
   background: url("../../static/assets/water_3.png") no-repeat;
   background-size: 100% 100%;
   width: 442rem/@rem;
   height: 895rem/@rem;
   /*z-index: 1;*/
  /*}
}*/

@keyframes eyeAni {
 0% {
   transform: scale(0.8);
   -webkit-transform: scale(0.8);
   -moz-transform: scale(0.8);
   -o-transform: scale(0.8);
   -ms-transform: scale(0.8);
 }
 50% {
   transform: scale(1.2);
   -webkit-transform: scale(1.2);
   -moz-transform: scale(1.2);
   -o-transform: scale(1.2);
   -ms-transform: scale(1.2);
 }
 100% {
   transform: scale(0.8);
   -webkit-transform: scale(0.8);
   -moz-transform: scale(0.8);
   -o-transform: scale(0.8);
   -ms-transform: scale(0.8);
 }
}

@keyframes bigMotion {
 0% {
   transform: scale(0.8);
   -webkit-transform: scale(0.8);
   -moz-transform: scale(0.8);
   -o-transform: scale(0.8);
   -ms-transform: scale(0.8);
 }
 50% {
   transform: scale(1.2);
   -webkit-transform: scale(1.2);
   -moz-transform: scale(1.2);
   -o-transform: scale(1.2);
   -ms-transform: scale(1.2);
 }
 100% {
   transform: scale(0.8);
   -webkit-transform: scale(0.8);
   -moz-transform: scale(0.8);
   -o-transform: scale(0.8);
   -ms-transform: scale(0.8);
 }
}

@keyframes bigMotion2 {
 0% {
   transform: scale(0.95);
   -webkit-transform: scale(0.95);
   -moz-transform: scale(0.95);
   -o-transform: scale(0.95);
   -ms-transform: scale(0.95);
 }
 50% {
   transform: scale(1.0);
   -webkit-transform: scale(1.0);
   -moz-transform: scale(1.0);
   -o-transform: scale(1.0);
   -ms-transform: scale(1.0);
 }
 100% {
   transform: scale(0.95);
   -webkit-transform: scale(0.95);
   -moz-transform: scale(0.95);
   -o-transform: scale(0.95);
   -ms-transform: scale(0.95);
 }
}

@keyframes rotateMotion {
 from {
   transform: rotate(0deg);
   -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    to {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg); /* IE 9 */
      -moz-transform: rotate(360deg); /* Firefox */
      -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
      -o-transform: rotate(360deg); /* Opera */
    }
  }

  @keyframes goldicon {
    10% {
      background: url("../../static/assets/goldcoin.png") no-repeat;
      background-size: 100% 100%;

      width: 169rem/@rem;
      height: 169rem/@rem;
      position: absolute;
      left: 330rem/@rem;
      top: 79rem/@rem;
      z-index: 2;

      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }

    100% {
      background: url("../../static/assets/goldcoin.png") no-repeat;
      background-size: 100% 100%;
      width: 169rem/@rem;
      height: 169rem/@rem;
      position: absolute;
      left: 330rem/@rem;
      top: 79rem/@rem;
      z-index: 2;

      transform: rotate(360deg);
      -ms-transform: rotate(360deg); /* IE 9 */
      -moz-transform: rotate(360deg); /* Firefox */
      -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
      -o-transform: rotate(360deg); /* Opera */
    }
  }

  @keyframes transX {
    0% {
      transform: translateX(10px, 0px);
      -webkit-transform: translate(10px, 0px);
      -moz-transform: translate(10px, 0px);
      -o-transform: translate(10px, 0px);
      -ms-transform: translate(10px, 0px);
    }
    /*25% {*/
    /*transform: translate(7px, 0px);*/
    /*-webkit-transform: translate(7px, 0px);*/
    /*-moz-transform: translate(7px, 0px);*/
    /*-o-transform: translate(7px, 0px);*/
    /*-ms-transform: translate(7px, 0px);*/
    /*}*/
    /*50% {*/
    /*transform: translate(0px, 0px);*/
    /*-webkit-transform: translate(0px, 0px);*/
    /*-moz-transform: translate(0px, 0px);*/
    /*-o-transform: translate(0px, 0px);*/
    /*-ms-transform: translate(0px, 0px);*/
    /*}*/
    95% {
      transform: translate(-7px, 0px);
      -webkit-transform: translate(-7px, 0px);
      -moz-transform: translate(-7px, 0px);
      -o-transform: translate(-7px, 0px);
      -ms-transform: translate(-7px, 0px);
    }
    100% {
      transform: translate(-10px, 0px);
      -webkit-transform: translate(-10px, 0px);
      -moz-transform: translate(-10px, 0px);
      -o-transform: translate(-10px, 0px);
      -ms-transform: translate(-10px, 0px);
    }
  }

  @keyframes test2 {
    from {
      transform: rotate(30deg) translateX(500px) translateY(50px);
    }
    to {
    }
  }

  @keyframes titleMotion {
    0% {
      transform: rotate(10deg);
      -ms-transform: rotate(10deg); /* IE 9 */
      -moz-transform: rotate(10deg); /* Firefox */
      -webkit-transform: rotate(10deg); /* Safari 和 Chrome */
      -o-transform: rotate(10deg); /* Opera */
    }
    50% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    100% {
      transform: rotate(10deg);
      -ms-transform: rotate(10deg); /* IE 9 */
      -moz-transform: rotate(10deg); /* Firefox */
      -webkit-transform: rotate(10deg); /* Safari 和 Chrome */
      -o-transform: rotate(10deg); /* Opera */
    }
  }


</style>
