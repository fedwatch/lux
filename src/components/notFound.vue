<template>
  <div id="notFound">

  </div>
</template>

<script>


  let buildUrl = "";
  if (process.env.NODE_ENV == "development") {
    buildUrl = "/static/";
    console.log(process.env.NODE_ENV);
  } else {
    buildUrl = "/h5Static/"
  }

  export default {
    name: 'HouseKeepingTest',
    data () {
      return {
        testState: false,
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
    },
    mounted: function () {

      setTimeout(function(){
        $.ajax({
          method:"get",
          url:"/V2/Wxh5/statistics",
          success:function(){

          }
        });
      },1000);


//      alert(window.devicePixelRatio)

      rem.resetRem();
      let ua = rem.myBrowser();
      if (ua == "Safari") {
        $(".share").hide();
      }

      this.PlayState = true;
      let _this;


      this.$http.get('/V2/AboutApp/getShareInfo?url=' + encodeURIComponent(URL)).then((data) => {

        // 微信配置
        wx.config({
          debug: false,
          appId: data.body.r.appId,
          timestamp: data.body.r.timestamp,
          nonceStr: data.body.r.nonceStr,
          signature: data.body.r.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ]
        });

//        wx.checkJsApi({
//          jsApiList: [
//            'onMenuShareTimeline',
//            'onMenuShareAppMessage',
//            'onMenuShareQQ',
//            'onMenuShareWeibo'
//          ],
//          success: function (data) {
//            // 以键值对的形式返回，可用的api值true，不可用为false
//            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//            alert(data)
//          }
//        });

      });

      //处理验证失败的信息
      wx.error(function (res) {
        console.log('验证失败返回的信息:', res);
      });


      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
      wx.ready(function () {
        let music = document.getElementById("music");
        music.src = buildUrl + "/music/PianoMan.mp3";
        music.play();


//        this.wxShare({
//          title: _this.ShareResult.title,
//          desc: '此测试预言了我双11的表现！',
//          link: encodeURIComponent(location.href.split("#")[0] + '?appRandom=' + Math.floor(Math.random() * 10000)),
//          imgUrl: location.protocol + "//" + location.host + '/h5Static/images/wxH5ShareIcon.png',
//          success: function () {  //可以不传
//            // 用户确认分享后执行的回调函数
//            _this.$http.get("/V2/Wxh5/statistics").then((data) => {
//
//            })
//          },
//          cancel: function () {  //可以不传
//          }
//        })
//
        //      发送给朋友圈
        wx.onMenuShareTimeline({
          title: _this.ShareResult.title,
          link: encodeURIComponent(location.href.split("#")[0] + '?appRandom=' + Math.floor(Math.random() * 10000)),
          imgUrl: location.protocol + "//" + location.host + '/h5Static/images/wxH5ShareIcon300.png',
          success: function () {
            _this.$http.get("/V2/Wxh5/statistics").then((data) => {
            })
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert("取消分享")
          }
        });

        //      发送给朋友
        wx.onMenuShareAppMessage({
          title: _this.ShareResult.title,
          desc: '此测试预言了我双11的表现！',
          link: encodeURIComponent(location.href.split("#")[0] + '?appRandom=' + Math.floor(Math.random() * 10000)),
          imgUrl: location.protocol + "//" + location.host + '/h5Static/images/wxH5ShareIcon.png',
          type: 'link',
          success: function () {
            // 用户确认分享后执行的回调函数
            _this.$http.get("/V2/Wxh5/statistics").then((data) => {
            })
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert("取消分享")
          }
        });

      });


    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @rem: 46.875;
  @disance-left: -10rem/@rem;
  @disance-right: 10rem/@rem;

  @font-face {
    font-family: "pangmen";
    src: url('../../static/fonts/pangmen.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  a, img, button, input, textarea, ul, li {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
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
    top: 20rem/@rem;
    right: 20rem/@rem;

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
      top: 20rem/@rem;
      right: 20rem/@rem;
    }

  }

  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  select {
    -webkit-appearance: none;
  }

  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }

  /*第一幕*/
  .houseKeepingIndex {
    background: url("../../static/assets/bg.png") no-repeat center center;
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
      background-size: 100% 95%;
      /*width: 667rem/@rem;*/
      width: 667rem/@rem;
      height: 480rem/@rem;

      /*   margin: 10rem/@rem auto;*/

      position: absolute;
      top: 30rem/@rem;
      right: 36rem/@rem;

      animation: bigMotion2 2s infinite;
      -moz-animation: bigMotion2 2s infinite;
      -webkit-animation: bigMotion2 2s infinite;
      -o-animation: bigMotion2 2s infinite;

    }

    .girl {
      background: url("../../static/assets/girl.png") no-repeat;
      background-size: 100% 100%;
      width: 121rem/@rem;
      height: 150rem/@rem;

      position: absolute;
      /*top: 571rem/@rem;*/
      top: 520rem/@rem;
      left: 150rem/@rem;

      /*  margin-left: 175rem/@rem;
        margin-top: 25rem/@rem;*/

    }

    .ask {
      width: 508rem/@rem;
      height: 126rem/@rem;
      text-align: center;
      margin: 155rem/@rem auto;
      /*     position: absolute;
           bottom: 250rem/@rem;
           left: 117rem/@rem;*/
    }

    .arrow {
      background: url("../../static/assets/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 259rem/@rem;
      height: 118rem/@rem;
      float: left;

      animation: transX 1.5s infinite;
      -moz-animation: transX 1.5s infinite;
      -webkit-animation: transX 1.5s infinite;
      -o-animation: transX 1.5s infinite;
      /*      position: absolute;
            bottom: 170rem/@rem;
            left: 117rem/@rem;    */

    }
    .ask-n {
      background: url("../../static/assets/ask-n.png") no-repeat;
      background-size: 100% 100%;
      width: 208rem/@rem;
      height: 114rem/@rem;
      float: right;

      /*     position: absolute;
           bottom: 186rem/@rem;
           right: 150rem/@rem;*/
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
    background: url("../../static/assets/water.gif") no-repeat;
    background-size: 100% 100%;
    width: 155rem/@rem;
    height: 733rem/@rem;

    position: absolute;
    top: 55rem/@rem;
    left: 10rem/@rem;

    /*  animation: waterAnimate 3s infinite;
      -moz-animation: waterAnimate 3s infinite;
      -webkit-animation: waterAnimate 3s infinite;
      -o-animation: waterAnimate 3s infinite;*/
    z-index: 2;
  }

  .goldicon {
    background: url("../../static/assets/goldcoin.png") no-repeat;
    background-size: 100% 100%;
    width: 169rem/@rem;
    height: 169rem/@rem;
    z-index: 2;

    position: absolute;
    left: 330rem/@rem;
    top: 80rem/@rem;
    /*    top: 30rem/@rem;*/

    animation: goldicon 3s infinite;
    -moz-animation: goldicon 3s infinite;
    -webkit-animation: goldicon 3s infinite;
    -o-animation: goldicon 3s infinite;
  }

  .mainTest {
    padding: 133.5rem/@rem 50rem/@rem;
    z-index: 10;
  }

  .testPage_body {
    background: url("../../static/assets/test_body.png") no-repeat;
    background-size: 100% 100%;
    width: 656rem/@rem;
    height: 865rem/@rem;
    margin: 130rem/@rem 50rem/@rem;
    /*    margin: 80rem/@rem 50rem/@rem;*/
    z-index: 5;
    position: absolute;
    /*   position: absolute;
       left: 52rem/@rem;
       top: 205rem/@rem;*/
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
    font-size: 30rem/@rem;
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
        background: url("../../static/assets/unselected.png") no-repeat left center;
        background-size: 10% auto;
        width: 80%;
        height: 20rem/@rem;
        margin: 40rem/@rem 0 50rem/@rem 0;
        padding: 20rem/@rem 25rem/@rem;
        text-align: left;
        vertical-align: middle;

        &:before {
          background: url("../../static/assets/unselected.png") no-repeat left center;
          background-size: 10% auto;
          padding: 0 20rem/@rem;
          width: 20rem/@rem;
          height: 20rem/@rem;
        }
        &.active {
          display: block;
          background: url("../../static/assets/selected.png") no-repeat left center;
          background-size: 10% auto;
          width: 80%;
          height: 20rem/@rem;
          margin: 40rem/@rem 0 50rem/@rem 0;
          padding: 20rem/@rem 25rem/@rem;
        }
        &.columnStyle {
          background: url("../../static/assets/unselected.png") no-repeat left center;
          background-size: 18% auto;
          width: 40%;
          height: 20rem/@rem;
          margin: 15rem/@rem 0rem/@rem;
          padding: 25rem/@rem 20rem/@rem;
          float: left;
          &.active {
            background: url("../../static/assets/selected.png") no-repeat left center;
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
          margin-top: -3rem/@rem;
          line-height: 35rem/@rem;

          .icon {
            display: block;
            float: left;
            width: 5%;
            padding: 0 10rem/@rem;

          }
          .desc {
            display: block;
            float: left;
            width: 90%;

          }

          &.columnStyle {
            width: 100%;
            text-align: center;
            padding: 0rem/@rem 20rem/@rem;
            line-height: 0.74666667rem;

            .icon {
              display: block;
              float: left;
              width: 20%;
              /*padding:0 10rem/@rem;*/
              text-align: right;
            }
            .desc {
              display: block;
              float: left;
              width: 60%;
            }

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
        z-index: 99;
      }
    }

    .hkr_body {
      background: url("../../static/assets/bg3.png") no-repeat;
      background-size: 100% 100%;
      width: 671rem/@rem;
      height: 853rem/@rem;
      text-align: center;
      /*margin: 120rem/@rem auto 45rem/@rem auto;*/
      margin: 0rem/@rem auto;

      position: absolute;
      left: 39rem/@rem;
      top: 50rem/@rem;
      /*      top: 130rem/@rem;*/

      h1.bodyTxt {
        font-family: "pangmen";
        padding-top: 150rem/@rem;
        padding-bottom: 0rem/@rem;
        padding-left: 20rem/@rem;
        font-size: 81.9rem/@rem;
        color: rgb(246, 60, 84);
        span {
          font-family: "pangmen";
          font-size: 139.8rem/@rem;
          color: rgb(246, 60, 84);
          /*    padding: 0 15rem/@rem;
              letter-spacing: 10rem/@rem;*/
        }
      }
      .bodyStyle {
        padding: 0rem/@rem 90rem/@rem;
      }

      .top1 {
        background: url("../../static/assets/top2.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 0rem/@rem auto;

      }
      .top2 {
        background: url("../../static/assets/top1.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 0rem/@rem auto;

      }
      .top3 {
        background: url("../../static/assets/top3.png") no-repeat;
        background-size: 100% 100%;
        width: 520rem/@rem;
        height: 330rem/@rem;
        margin: 0rem/@rem auto;

      }
    }
    .button {
      background: url("../../static/assets/button.png") no-repeat;
      background-size: 100% 100%;
      width: 394rem/@rem;
      height: 175rem/@rem;
      /*      margin: 0rem/@rem auto;*/
      position: absolute;
      bottom: 25rem/@rem;
      left: 198rem/@rem;
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
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    100% {
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

  // 荣耀 6 PLUS
  @media (device-width: 360px)and(device-height: 640px) and(-webkit-min-device-pixel-ratio: 3) {
    .water {
      top: 0;
    }

    .goldicon {
      top: 0.64rem;
    }

    .ask {
      width: 508rem/@rem !important;
      height: 126rem/@rem;
      text-align: center;
      margin: 130rem/@rem auto !important;
    }

    .testPage_body {
      margin: 1.30667rem 1.06667rem;
    }

    .button {
      background: url("../../static/assets/button.png") no-repeat;
      background-size: 100% 100%;
      width: 394rem/@rem;
      height: 175rem/@rem;
      position: absolute;
      bottom: 10rem/@rem;
      left: 198rem/@rem;
    }

    .hkr_body {
      /*top:2.77333rem!important;*/
    }
  }

  @media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone4/4s */

  }

  @media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone5 */

  }

  @media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone6 */

  }

  @media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone6 Plus */
    .ask {
      margin: 2.77333rem;
    }

    .girl {
      top: 11.09333333rem;
    }

    .testPage_body {
      margin: 1.70667rem 1.06667rem;
    }

    .goldicon {
      top: 0.64rem;
    }

    .water {
      top: 0;
    }
  }


</style>
