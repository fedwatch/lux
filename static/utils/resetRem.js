let rem = {
  resetRem : function(){
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
  on : function(){
    let me = this;
    window.onresize = function() {
      window.setTimeout(me.resetRem, 300);
    }
  }
}

export default rem;
