<!--关于我们-->
<template>
    <div class="aboutus-wrap">
        <div class="aboutus-title">
            <ul class="title-list">
                <li class="list act">公司简介</li>
                <li class="list">管理团队</li>
                <li class="list">平台数据</li>
                <li class="list">安全保障</li>
            </ul>
            <i class="arr"></i>
        </div>
        <div class="clearfix aboutus-content">
            <div class="content content1">
                <div class="scroll">
                    <div class="img"><img src="/static/images/aboutus/tab1_jpg.png" alt=""/></div>
                    <div class="text">
                        <p>火理财平台是由上海潇谦互联网金融信息服务有限公司运营，由一支精英团队主导设计的互联网借贷信息中介平台。</p>
                        <p>通过先进的互联网技术和持续的金融创新，为有理财需求却没有太多理财经验的人，提供合法、便捷、透明的投资渠道。</p>
                        <p>火理财希望将金融惠及更多老百姓，让他们都能够聪明的投资，智慧的理财，拥有更美好的生活！</p>
                        <ul>
                            <li class="clearfix"><span>运营主体：</span><em>上海潇谦互联网金融信息服务有限公司</em></li>
                            <li class="clearfix"><span>上线时间：</span><em>2015年5月15日</em></li>
                            <li class="clearfix"><span>成立时间：</span><em>2015年8月10日</em></li>
                            <li class="clearfix"><span>注册资本：</span><em>2050万人民币</em></li>
                            <li class="clearfix"><span>实缴资本：</span><em>1000万人民币</em></li>
                            <li class="clearfix"><span>注册地址：</span><em>上海市崇明区城桥镇东河沿68号B幢535室（上海城桥经济开发区）</em></li>
                            <li class="clearfix">
                                <span>股&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;东：</span><em>上海永利宝金融信息服务有限公司</em></li>
                            <li class="clearfix"><span>经营地址：</span><em>上海市浦东新区康桥路1157号12栋162室</em></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content content2">
                <div class="scroll">
                    <div class="clearfix role-list">
                        <div class="img">
                            <img src="/static/images/aboutus/head1.png?v=0616"/>
                        </div>
                        <div class="text">
                            <h2>余刚</h2>
                            <em>董事长</em>
                            <p>
                                复旦大学硕士，金融行业新贵。曾任职中国平安投资副总裁、凯雷复星高级投资总监。中国注册会计师。依靠专业的金融理论和扎实的实战经验，敏锐洞察到互联网借贷平台的发展潜力，将网络信贷的业务模式创新、信用评价模型和风险管理体系建设有机结合。</p>
                        </div>
                        <a href="javascript:;" class="btn"><i></i></a>
                    </div>
                    <div class="clearfix role-list">
                        <div class="img">
                            <img src="/static/images/aboutus/head2.png?v=0616"/>
                        </div>
                        <div class="text">
                            <h2>张玉丰</h2>
                            <em>CEO</em>
                            <p>毕业于河北大学软件工程专业；<br>先后供职于赶集网、新浪微博、百度等大型互联网公司，熟悉现代高并发技术架构和解决方案，注重实用、高效的技术架构和开发模式，对互联网产品趋势、应用场景技术选型、研发团队管理等方向有深刻理解。
                            </p>
                        </div>
                        <a href="javascript:;" class="btn"><i></i></a>
                    </div>
                    <div class="clearfix role-list">
                        <div class="img">
                            <img src="/static/images/aboutus/head3.png?v=0616"/>
                        </div>
                        <div class="text">
                            <h2>李昊原</h2>
                            <em>研发总监</em>
                            <p>
                                河北大学软件工程专业，自大学起就屡次主导最前沿的互联网项目，有着超过10年的互联网技术经验。曾任职于大型互联网上市公司，完成了多个项目的技术框架搭建，对网贷平台的抗风险能力、系统组织架构合理性有充分的认知，并能把最新技术运用到“互联网+”模式中去。</p>
                        </div>
                        <a href="javascript:;" class="btn"><i></i></a>
                    </div>
                </div>
            </div>
            <div class="content content3">
                <div class="scroll">
                    <div class="date">数据截止至：{$date_line}</div>
                    <div class="img"><img src="/static/images/aboutus/tab2_jpg.png"/></div>
                    <div class="clearfix data">
                        <div class="">
                            <em id="registerUser">{$register_user}</em>
                            <span>注册用户数(人)</span>
                        </div>
                        <div class="">
                            <em id="investUser">{$invest_user}</em>
                            <span>投资人总数(人)</span>
                        </div>
                        <div class="">
                            <em id="investMoney">{$invest_money}</em>
                            <span>交易总额(万元)</span>
                        </div>
                        <div class="">
                            <em id="investCount">{$invest_count}</em>
                            <span>交易总笔数</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content content4">
                <div class="scroll">
                    <div class="clearfix safe-list">
                        <div class="img"><img src="/static/images/aboutus/icon1.png"/></div>
                        <div class="text">
                            <h2>自主研发</h2>
                            <p>系统研发与运维自主完成,并定期升级维护</p>
                        </div>
                    </div>
                    <div class="clearfix safe-list">
                        <div class="img"><img src="/static/images/aboutus/icon2.png"/></div>
                        <div class="text">
                            <h2>数据备份</h2>
                            <p>集群式存储，不出现单点故障，数据定期备份</p>
                        </div>
                    </div>
                    <div class="clearfix safe-list">
                        <div class="img"><img src="/static/images/aboutus/icon3.png"/></div>
                        <div class="text">
                            <h2>全程加密</h2>
                            <p>前后端https加密传输，用户数据存储全程加密</p>
                        </div>
                    </div>
                    <div class="clearfix safe-list">
                        <div class="img"><img src="/static/images/aboutus/icon4.png"/></div>
                        <div class="text">
                            <h2>安全检测</h2>
                            <p>限制接口调用频率、采用反检测、用户密码防爆破控制</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
  html,body{
    height:100%;
  }

  @rem: 23.4375;
  .clearfix{
    &:after{
      content: " ";
      display: block;
      clear: both;
      height: 0;
    }
    zoom:1;
  }
  .aboutus-wrap{
    height:100%;
    overflow:hidden;
    .aboutus-title{
      position:fixed;
      z-index:10;
      width:100%;
      overflow:hidden;
      background:#F63C54;
      .title-list{
        -webkit-display: flex;
        -moz-display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        z-index:10;
        color:#fff;
        .list{
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          height:54rem/@rem;
          line-height:54rem/@rem;
          font-size:13rem/@rem;
          text-align:center;
          &.act{
            font-size:15rem/@rem;
            -webkit-transition:font .3s ease;
            transition:font .3s ease;
          }
        }
      }
      .arr{
        position:absolute;
        bottom:0;
        width:29rem/@rem;
        height:12rem/@rem;
        background:url(/static/images/aboutus/arr.png) no-repeat bottom;
        -webkit-background-size:100%;
        background-size:100% auto;
        opacity:0;
      }
    }
    .aboutus-content{
      position:relative;
      z-index:5;
      width:100%;
      height:100%;
      box-sizing:border-box;
      padding-top:54rem/@rem;
      overflow:hidden;
      .content{
        float:left;
        width:100%;
        height:100%;
        overflow-y:auto;
        box-sizing:border-box;
        -webkit-overflow-scrolling: touch;
        .scroll{

        }
        &.content1{
          padding:25rem/@rem 25rem/@rem 20rem/@rem;
          box-sizing:border-box;
          .img{
            width:100%;
            margin-bottom:20rem/@rem;
            img{
              display:block;
              width:100%;
            }
          }
          .text{
            font-size:13rem/@rem;
            line-height:25rem/@rem;
            color:rgba(56,64,74,1);
            p{
              text-indent:2em;
              text-align: justify;
            }
            ul{
              margin-top:20rem/@rem;
              li{
                span{
                  float:left;
                  width:67rem/@rem;
                }
                em{
                  display:block;
                  margin-left:67rem/@rem;
                }
              }
            }
          }
        }
        &.content2{
          padding:0 0 20rem/@rem 16rem/@rem;
          .role-list{
            position:relative;
            padding:25rem/@rem 0 0;
            .img{
              float:left;
              width:84rem/@rem;
              height:84rem/@rem;
              img{
                display:block;
                width:100%;
              }
            }
            .text{
              margin-left:100rem/@rem;
              padding-right:25rem/@rem;
              line-height:1;
              h2{
                padding-top:6rem/@rem;
                font-size:17rem/@rem;
                color:rgba(56,64,75,1);
              }
              em{
                display:block;
                margin:10rem/@rem 0;
                font-size:15rem/@rem;
                color:rgba(56,64,75,1);
              }
              p{
                height:66rem/@rem;
                overflow:hidden;
                line-height:22rem/@rem;
                font-size:13rem/@rem;
                color:rgba(130,130,130,1);
                text-align: justify;
              }
            }
            .btn{
              position:relative;
              display:block;
              width:100%;
              height:35rem/@rem;
              i{
                position:absolute;
                top:50%;
                right:30rem/@rem;
                width:14rem/@rem;
                height:7rem/@rem;
                margin-top:-3.5rem/@rem;
                -webkit-transition:transform .3s ease;
                transition:transform .3s ease;
                -webkit-transform:rotate(180deg);
                transform:rotate(180deg);
                background:url(/static/images/aboutus/arr_up.png) no-repeat;
                -webkit-background-size:100% auto;
                background-size:100% auto;
              }
            }
            &:after{
              display:block;
              position:absolute;
              content:'';
              left:0;
              bottom:0;
              width:100%;
              height:1px;
              background:#e1e1e1;
              -webkit-transform:scaleY(.5);
              transform:scaleY(.5);
            }
            &.open{
              .text{
                p{
                  height:auto;
                }
              }
              .btn{
                i{
                  -webkit-transform:rotate(0);
                  transform:rotate(0);
                }
              }
            }
          }
        }
        &.content3{
          position:relative;
          padding:15rem/@rem 19rem/@rem 20rem/@rem;
          .date{
            margin-bottom:10rem/@rem;
            font-size:13rem/@rem;
            color:rgba(178,178,178,1);
            text-align:right;
          }
          .img{
            width:100%;
            img{
              display:block;
              width:100%;
            }
          }
          .data{
            position:absolute;
            top:230rem/@rem;
            left:50%;
            width:318rem/@rem;
            -webkit-transform:translate(-50%,0);
            transform:translate(-50%,0);
            background:#fff;
            -webkit-border-radius:5rem/@rem;
            border-radius:5rem/@rem;
            -webkit-box-shadow:0 5px 10px rgba(252,109,120, 0.15);
            box-shadow:0 5px 10px rgba(252,109,120, 0.15);
            div{
              float:left;
              width:50%;
              padding:39rem/@rem 0 33rem/@rem;
              line-height:1;
              text-align:center;
              em{
                display:block;
                font-size:24rem/@rem;
                color:rgba(240,34,67,1);
              }
              span{
                display:block;
                margin-top:10rem/@rem;
                font-size:12rem/@rem;
                color:rgba(130,130,130,1);
              }
            }
            &:before{
              position:absolute;
              content:'';
              top:50%;
              left:50%;
              width:80%;
              height:1px;
              -webkit-transform:translate(-50%,-50%) scaleY(.5);
              transform:translate(-50%,-50%) scaleY(.5);
              background:#e1e1e1;
            }
            &:after{
              position:absolute;
              content:'';
              top:50%;
              left:50%;
              width:58%;
              height:1px;
              -webkit-transform:translate(-50%,-50%) rotate(90deg) scaleY(.5);
              transform:translate(-50%,-50%) rotate(90deg) scaleY(.5);
              background:#e1e1e1;
            }
          }
        }
        &.content4{
          padding:10rem/@rem 38rem/@rem 0;
          .safe-list{
            display:table;
            position:relative;
            padding:39rem/@rem 0 48rem/@rem;
            .img{
              display:table-cell;
              width:122rem/@rem;
              vertical-align:middle;
              img{
                display:block;
                width:65%;
                margin:0 auto;
              }
            }
            .text{
              display:table-cell;
              vertical-align:middle;
              h2{
                font-size:20rem/@rem;
                line-height:24rem/@rem;
                color:rgba(246,60,84,1);
              }
              p{
                margin-top:6rem/@rem;
                font-size:13rem/@rem;
                line-height:22rem/@rem;
                color:rgba(130,130,130,1);
              }
            }
            &:after{
              position:absolute;
              content:'';
              bottom:0;
              left:0;
              width:100%;
              height:1px;
              -webkit-transform:scaleY(.5);
              transform:scaleY(.5);
              background:#e1e1e1;
            }
            &:last-child{
              &:after{
                display:none;
              }
            }
          }
        }
      }
    }
  }

</style>
<script>
    import $ from 'n-zepto';
    import mainNow from "@/static/js/mainNow";
    import rem  from "@/static/utils/resetRem";
//    require("/static/js/zepto.animate.js")
//    import '/static/style/reset.scss';



    export default {
      name: 'index',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          transitionName:"no"
        }
      },
      mounted(){
        mainNow.init();
      }
    }

</script>
