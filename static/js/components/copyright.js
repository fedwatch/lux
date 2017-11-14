//版权信息
let copyright = {

	isAndroid : navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1, //android终端或者uc浏览器
	isiOS : !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端

	init : function () {
		if(this.isiOS){
		    $("#copyright").html("活动解释权归上海潇谦互联网金融信息服务有限公司所有<br/>活动和奖品由潇谦提供，与设备生产商苹果公司（Apple.lnc）无关<br/>如有疑问请联系在线客服或拨打 400-610-5757<br/>网贷有风险，借贷需谨慎");

		}else{
			$("#copyright").html("活动解释权归上海潇谦互联网金融信息服务有限公司所有<br/>如有疑问请联系在线客服或拨打400-610-5757<br/>网贷有风险，借贷需谨慎");
		}
	}
};
copyright.init();

export default copyright;

