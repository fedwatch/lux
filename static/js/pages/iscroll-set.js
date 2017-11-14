/*
 *下拉加载更多HTML文件表
 *日期2015.9.9
 *刘广阔
 Transfer\myTransferList.html
 Integral\myLottery.html
 Integral\records.html
 User\tradeList.html
 Activity\recommendRewardRecords.html
 RegularTransfer\myTransferList.html
 */
var myScroll,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function loaded() {
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		onRefresh: function () {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				if(noMore){
					pullUpEl.innerHTML = '<span class="pullUpIcon iconfont">&#xe621;</span><span class="pullUpLabel">上拉可以加载更多数据</span>';
				}else{
					pullUpEl.innerHTML = '没有更多的数据';
				}
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.innerHTML = '<span class="pullUpIcon iconfont">&#xe621;</span><span class="pullUpLabel">松开立即加载更多数据</span>';
				this.maxScrollY = this.maxScrollY;
			}
		},
		onScrollEnd: function () {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.innerHTML = '<img src="/static/images/hlc/integral/more.gif" />正在帮你加载数据...';			
				pullUpAction();	


			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);