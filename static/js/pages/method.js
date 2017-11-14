//判断终端
function isIos(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isIos){
		return true;
	}else if(isAndroid){
		return false; 
	}
}

//判断微信
function isWeiXin(){ 
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true;
    }else{ 
        return false; 
    } 
}

/*
webView分享
obj : ID
title : 标题
content : 内容
imgUrl : 小图标地址
url : 点击跳转地址
shareType类型：
	所有 ： all
	微信好友：weixinFriends
	朋友圈：moments
	QQ好友: QQFriends
	微博 : weibo
*/
function webViewShare(obj,title,content,imgUrl,url,shareType){
		var shareBtn = document.getElementById(obj);
		if(isIos()){
			shareBtn.href='share:{"title":"'+title+'","content":"'+content+'","imgUrl":"'+imgUrl+'","url":"'+url+'","shareType":"'+shareType+'"}'
		}else{
			window.Android.callShare(title,content,imgUrl,url,shareType);
		}
	}