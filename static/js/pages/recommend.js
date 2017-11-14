var recommend = {
	opts : {
		telc : $('#tel'),  //手机号
		vcode : $('#vcode'),  //短信验证码
		regBtn : $('#reg_btn'), //领取按钮
		regGet : $('#reg_get'),  //获取短信验证码按钮
		chkBtn : $("#chk"),     // 协议input
		tel : /^1[3-578]\d{9}$/,
		aCode : /^\d{6}$/,
		timer : null,
		canClick : true,
		timer2 : null,
		key : true,
		TEL_OK : false,
		VCODE_OK : false,
		CHK_OK : true,
		CAPTCHA_OK : true, //图形验证码开关
		REGISTER_OK : true,  //注册按钮开关
		sms_ticket : '',
		captcha_ticket :''
	},
	init : function(){
		this.bindEvents();
	},
	bindEvents : function(){
		var self = this;

		// 注册协议
		self.opts.chkBtn.on('change',function(){
			if($(this).attr("checked")){
				$(this).parent().addClass('on');
				self.opts.CHK_OK = true;
			}else{
				$(this).parent().removeClass('on');
				self.opts.CHK_OK = false;
			}
			self.chekState();
		})

		// 手机号
		self.opts.telc.on('keyup',function(){
			var vtelc = $(this).val();
			if(self.opts.tel.test(vtelc)){
				self.opts.TEL_OK = true;
			}else{
				self.opts.TEL_OK = false;
			}
			self.chekState();
		}).on('blur',function(){
			var vtelc = $(this).val();
			if(vtelc.length >= 11){
				if(!self.opts.tel.test(vtelc)){
					self.showFun('请输入正确的手机号码好嘛~');
				}
			}
		})

		//短信验证码
		self.opts.vcode.on('keyup',function(){
			var vvcode = $(this).val();
			if(self.opts.aCode.test(vvcode)){
				self.opts.VCODE_OK = true;
			}else{
				self.opts.VCODE_OK = false;
			}
			self.chekState();
		})

		//点击领取按钮
		self.opts.regBtn.on('click',function(){
			var vtelc = self.opts.telc.val();
			var vvcode = self.opts.vcode.val();
			var recommendCode = $('#recommendCode').val();
	        var recommendActivityType = $('#recommendActivityType').val();
	        // var url = "/V2/Recommend/recommendRegiste";
			var _this = $(this);
			if(_this.hasClass('dis_btn')){ //dis_btn相当于开关
				return false;
			}

			//点击第一步领取
			if(!_this.hasClass('yzm-show')){
				self.opts.regBtn.addClass('dis_btn');  // 不管是否注册过领取按钮都不可点
				// ajax，判断手机号是否已经注册，注册过toast提示，没有注册过直接到第二步
				$.ajax({
					url : '/Recommend/isMobileExist',
					type : 'POST',
					data : {
						phone : vtelc,
						checkFirst : 1 //需要判断该手机号是否是第一次发送短信验证码
					},
					success : function(res){
						console.log(res);
						if(res.code == 1000){//手机号没有注册过，并且是首次获取短信，并且短信验证码已发
							//显示验证码输入框，到第二步，提示用户验证码已发
							$('.yzm').show();
							self.opts.regBtn.val('立即领取').addClass('yzm-show');
							self.count();
							setTimeout(function(){
								self.showFun('验证码发送成功');
							},1000);
							$('.award_msg').addClass('gotop');
							self.opts.sms_ticket = res.sms_ticket;

						}else if(res.code == 0){ //没有注册过，但发送验证码失败
							$('.yzm').show();
							self.opts.regBtn.val('立即领取').addClass('yzm-show');
							self.opts.regGet.text('获取验证码');
							setTimeout(function(){
								self.showFun('验证码发送失败');
							},1000);
							$('.award_msg').addClass('gotop');

						}else if(res.code == 2){ //手机号为空
							self.showFun('请输入正确的手机号码好嘛~');
						}else if(res.code == 3){ //手机号格式不正确
							self.showFun('请输入正确的手机号码好嘛~');
						}else if(res.code == 4){ //该手机号码已经注册过啦~
							self.showFun('该手机号码已经注册过啦~');
						}else if(res.code == 12){  //发送验证码次数超限
							self.showFun('今日验证码次数已达上限');
						}else if(res.code == 13){ //不是首次发送验证码，显示图形验证码
							self.showCaptcha();
						}
					}
				})

			}else{//点击第二步领取
				if(!self.opts.tel.test(vtelc)){
					self.showFun('请输入正确的手机号码好嘛~');
					return false;
				}
				if(!self.opts.aCode.test(vvcode)){
					self.showFun('短信验证码有误，请重新输入');
					return false;
				}
				if(!self.opts.REGISTER_OK) return;
				self.opts.REGISTER_OK = false;
				self.opts.regBtn.val("注册中...");
				self.registerAjax({
					vtelc : vtelc,
					vvcode : vvcode,
					recommendCode : recommendCode,
					recommendActivityType : recommendActivityType
				});
			}
		})

		// 更新图形验证码
		$("#captcha_img").on('click',function(){
			self.getCaptcha();
		})

		// 图形验证码确定事件
		$('#captchaBtn').on('click',function(event){
			var captcha = $('#captcha_input').val();
			if(!captcha){
				self.showFun('请输入图形验证码');
				return;
			}
			if(captcha.length != 4){
				self.showFun('验证码错误，请重新输入');
				return;
			}
			if(!self.opts.CAPTCHA_OK) return;
			self.opts.CAPTCHA_OK = false;
			$.ajax({
				// url : '/Recommend/verifyCaptcha',
				url : '/Recommend/sms',
				type : 'POST',
				data : {
					phone : $('#tel').val(),
					captcha : captcha,
					captcha_ticket : self.opts.captcha_ticket
				},
				success : function(res){
					self.opts.CAPTCHA_OK = true;
					if(res.code == 1000){ //图形验证码正确，显示第二步，并发送短信验证码
						self.opts.sms_ticket = res.data.sms_ticket;
						$('#captcha_input').val(''); //清空图形验证码
						$('.pcaptcha').stop().fadeOut(); //图形验证码框隐藏
						$('.desktop2').hide();
						$('.yzm').show();
						self.opts.regBtn.val('立即领取').addClass('yzm-show');
						// self.sendCodeAjax();
						self.count();
						setTimeout(function(){
							self.showFun('验证码发送成功');
						},1000);
						$('.award_msg').addClass('gotop');

					}
					// else if(res.code == 10){ //图形验证码为空
					// 	self.showFun('请输入图形验证码');
					// }else if(res.code == 11){
					// 	self.showFun('验证码错误，请重新输入');
					// 	var nowtime = new Date().getTime(); //刷新图形验证码
					// 	$("#captcha_img").attr("src",'/Recommend/captchaImg?'+nowtime);
					// }
					else if(res.code == 4605){ //验证码错误
						self.showFun('验证码错误，请重新输入');
						self.getCaptcha();
					}else if(res.code == 4606){ //图形验证码超过次数
						self.showFun('图形验证码超过次数');
					}else if(res.code == 9001){
						self.showFun('验证码错误，请重新输入');
						self.getCaptcha();
					}
				}
			})
		})

		// 获取短信验证码,需要判断手机号是否已注册过，因为第二步用户可能改了手机号
		self.opts.regGet.on('click',function(){
			var _this = $(this);
			if(typeof(_this.attr('data-disabled')) == 'undefined'){
				var vtelc = self.opts.telc.val();
	            var recommendCode = $('#recommendCode').val();
				if(!self.opts.tel.test(vtelc)){
					self.showFun('请输入正确的手机号码好嘛~');
				}else{
					$.ajax({
						url : '/Recommend/isMobileExist',
						type : 'POST',
						data : {
							phone : vtelc,
							checkFirst : 0 //不需要判断该手机号是否是第一次发送短信验证码
						},
						success : function(res){
							if(res.code == 14){//手机号没有注册过，显示图形验证码
								self.showCaptcha();
							}else if(res.code == 2){ //手机号为空
								self.showFun('请输入正确的手机号码好嘛~');
							}else if(res.code == 3){ //手机号格式不正确
								self.showFun('请输入正确的手机号码好嘛~');
							}else if(res.code == 4){ //该手机号码已经注册过啦~
								self.showFun('该手机号码已经注册过啦~');
							}
						}
					})
				}
			}
		})

		$(".close").on('click',function(){
			if($(this).closest('.modal').hasClass('pcaptcha')){
				$('#captcha_input').val(''); //关闭图形验证码弹框，清空图形验证码
				$(".modal,.desktop2").hide();
				self.chekState();
			}
			if($(this).closest('.modal').hasClass('reg_result')){
				window.location.reload(); //关闭注册失败弹框，刷新页面
			}

		})
	},
	showCaptcha : function(){
		var self = this;
		$('.pcaptcha').stop().fadeIn();
		$('.desktop2').show();
		self.getCaptcha();
	},
	getCaptcha : function(){
		var self = this;
		$.ajax({  //获取图形验证码
			url : '/Recommend/getCaptcha',
			type : 'POST',
			data:{},
			success : function(res){
				if(res.code == 1000){
					self.opts.captcha_ticket = res.data.captcha_ticket;
					$("#captcha_img").attr("src",res.data.captcha);
				}
			}
		})
	},
	registerAjax: function(options){
		var self = this;
		$.ajax({  //注册接口
            type: "POST",
            url: '/Recommend/recommendRegister',
            timeout: 6000,
            data : {
            	phone : options.vtelc,
            	code : options.vvcode,
            	sms_ticket : self.opts.sms_ticket,
            	recommendCode : options.recommendCode,
            	recommendActivityType : options.recommendActivityType
            },
            success: function(res){
            	self.opts.REGISTER_OK = true;
                $(".reg_get").removeAttr('data-disabled');
                self.opts.regBtn.val("立即领取");
                if(res.code == 0){
                    $('.reg_result').find('.text').html('啊哦，注册失败了。')
                   	$('.reg_result').stop().fadeIn();
					$('.desktop2').show();
                    return false;
                }
                if(res.code == 2){
                    self.showFun('对不起，参数输入错误！');
                    return false;
                }
                if(res.code == 3){
                    self.showFun('对不起，手机号格式不正确！');
                    return false;
                }
                if(res.code == 4){ //该手机已注册
                   	self.showFun('该手机号码已经注册过啦~');
                    return false;
                }
                if(res.code == 2014){
                    self.showFun('验证码有误，请重新输入');
                    return false;
                }
                if(res.code == 2005){
                    self.showFun('短信验证码超过最大错误次数');
                    return false;
                }
                if(res.code == 2004){
                    self.showFun('短信验证码已经过期');
                    return false;
                }
                if(res.code == 2002){
                    self.showFun('短信验证码发送请求过于频繁');
                    return false;
                }
                if(res.code == 1000){ //注册成功
					window.location.href="/recommend/registerSuccess";
                }
            },
            error : function(error){
            	self.opts.registerAjax = true;
                self.showFun('对不起，请求失败，请重试！');
                $(".reg_get").removeAttr('data-disabled');
                self.opts.regBtn.val("立即领取");
                return false;
            }
        });
	},
	count : function(){
		var self = this,
			time = 60;
		clearInterval(self.opts.timer2);
		self.opts.timer2 = setInterval(function(){
			time--;
			self.opts.regGet.attr('data-disabled','1');
			self.opts.regGet.html(time+"秒");
			if(time < 0){
				self.opts.regGet.html("获取验证码");
				clearInterval(self.opts.timer2);
				self.opts.regGet.removeAttr('data-disabled');
				self.opts.canClick = true;
			}
		},1000);
	},

	// 发送短信验证码ajax
	sendCodeAjax : function(){
		var self = this;
		$.ajax({
	        type: "POST",
	        url: "/Recommend/sendSms",
	        data : {
	        	phone : self.opts.telc.val()
	        },
	        timeout: 6000,
	        success: function(res){
	            // self.opts.canClick = true;
	            // $("#captcha_img").attr("src",'/V2/Recommend/captchaImg');
	            if(res.code == 1){
	                self.showFun('验证码发送成功');
	                self.count(); //倒计时
	                return false;
	            }
	            if(res.code == 0){
	                self.showFun('验证码发送失败');
	                return false;
	            }
	            if(res.code == 2){
	                self.showFun('手机号为空');
	                return false;
	            }
	            if(res.code == 3){
	                self.showFun('手机号格式不正确');
	                return false;
	            }
	            if(res.code == 4){
	                self.showFun('手机号已经存在');
	                return false;
	            }
	            if(res.code == 5){
	                self.showFun('请求太频繁');
	                return false;
	            }
	            if(res.code == 12){
	                self.showFun('今日验证码次数已达上限');
	                return false;
	            }

	        },
	        error : function(error){
	            self.showFun();
	            $('.normal p').html('对不起，请求失败，请重试！');
	            return false;
	        }
	    });
	},
	showFun : function(txt,t){
		var self = this;
		if(self.opts.key){
			t = t || 3000;
			txt = txt || '警告';
			clearTimeout(self.opts.timer);
			self.opts.key = false;
			$(".toast").text(txt).stop().fadeIn();
			$(".desktop").show();
			self.opts.timer = setTimeout(function(){
				$(".toast").stop().fadeOut(function(){
					self.opts.key = true;
				});
				$(".desktop").hide();
			},t)
		}
	},
	chekState : function(){
		var self = this;
		if(self.opts.vcode.is(":visible")){
			if(self.opts.TEL_OK && self.opts.VCODE_OK && self.opts.CHK_OK){
				if(self.opts.regBtn.hasClass('dis_btn')){
					self.opts.regBtn.removeClass('dis_btn');
				}
			}else{
				self.opts.regBtn.addClass('dis_btn');
			}
		}else{
			if(self.opts.TEL_OK && self.opts.CHK_OK){
				if(self.opts.regBtn.hasClass('dis_btn')){
					self.opts.regBtn.removeClass('dis_btn');
				}
			}else{
				self.opts.regBtn.addClass('dis_btn');
			}
		}

	}
}

recommend.init();


export default recommend;
