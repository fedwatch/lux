// options参数说明
// options:{
//  shareTip : '',  //分享弹窗上面的提示内容
// 	title : '',    //分享的标题
// 	content : '',  //描述
// 	url : '',      //分享链接
// 	imgUrl : '',   //分享图片
// 	shareTypes : '', //分享类型，数组 // 所有 ：all， 微信好友：weixinFriends，朋友圈：moments， QQ好友: QQFriends，微博 : weibo
//  isRightShare : 0 //右上角是否有分享按钮（1：为有，0：没有，进入页面的时候调用时有该参数，点击h5中的按钮调用时，没有该参数）
// }

// 调用实例
// appShare('shareBtn',{ //H5按钮的分享
//        shareTip: 'test',
//        title:'呼朋唤友，fun肆一夏！你的好友邀请你来领礼包啦~',
//        content : '1%加息券，一键即可领取，任意首投还送9888元体验金',
//        url : 'http://139.129.110.155/recommend/recommend',
//        imgUrl : 'http://139.129.110.155/static/images/global/share_logo.jpg',
//        shareTypes : ['weixinFriends','QQFriends']
//    })
//    appShare('',{     //原生按钮的分享
//        shareTip: 'test',
//        title:'呼朋唤友，fun肆一夏！你的好友邀请你来领礼包啦~',
//        content : '1%加息券，一键即可领取，任意首投还送9888元体验金',
//        url : 'http://139.129.110.155/recommend/recommend',
//        imgUrl : 'http://139.129.110.155/static/images/global/share_logo.jpg',
//        shareTypes : ['weixinFriends','QQFriends'],
//        isRightShare : '1'
//    })

let appShare = {
  init(){
    if (_id !== '') { //h5页面中触发分享(有id)
      if (this.isIos()) {
        document.getElementById(_id).setAttribute('href', 'share:' + JSON.stringify(options));
      } else {
        document.getElementById(_id).setAttribute('href', 'javascript:;');
        document.getElementById(_id).onclick = function () {
          webViewShare('share', options);
        }
      }
    }
    else { //app右上角触发分享
      if (this.isIos()) {
        window.location.href = 'share:' + JSON.stringify(options);
      } else {
        webViewShare('share', options);
      }
    }
  },
  initHello() {
    console.log("[appShare]Hello ")
    init();
  },

  //判断终端
  isIos() {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIos) {
      return true;
    } else if (isAndroid) {
      return false;
    }
  },
  webViewShare(obj, options) {
    window.Android.callShare(JSON.stringify(options));
  }
};

export default appShare;

