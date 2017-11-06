let rem = {
  resetRem: function () {
    console.log("resetRem start")
    let me = this;
    let rect = window.document.documentElement.getBoundingClientRect();
    let width = rect.width > 750 ? 750 : rect.width;
    window.rootEm = parseFloat(width / 320 * 20);
    console.log(window.rootEm);
    document.getElementsByTagName('html')[0].style.fontSize = rootEm + "px";
    rem.on();
    console.log("resetRem end")
  },
  on: function () {
    let me = this;
    window.onresize = function () {
      window.setTimeout(me.resetRem, 300);
    }
  },
  myBrowser(){
    let userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("opera") > -1;
    if (isOpera) {
      return "Opera"
    }
    if (userAgent.indexOf("firefox") > -1) {
      return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("chrome") > -1) {
      return "Chrome";
    }
    if (userAgent.indexOf("safari") > -1) {
      return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("micromessenger") > -1) {
      return "wxApp";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1 && !isOpera) {
      return "IE";
    }
  }
}

export default rem;
