let mt = $(".aboutus-title"),
  ct = mt.find(".list"),
  cw = ct.width(),
  arr = $(".arr"),
  aw = arr.width(),
  cl = ct.length,
  mb = $(".aboutus-content"),
  cb = mb.find(".content"),
  ww = $(window).width(),
  sets = [];
let main = {
  init: function () {
    mb.css("width", cl * ww);
    cb.css("width", ww);

    ct.each(function () {
      let i = $(this).index();
      let po = cw / 2 - aw / 2 + i * cw;
      sets.push(po);
    })
    arr[0].style.transform = "translate3d(" + sets[0] + "px,0,0)";
    arr[0].style.webkitTransform = "translate3d(" + sets[0] + "px,0,0)";
    arr.css({
      opacity: 1
    })
    ct.on("click", function () {
      if ($(this).hasClass('act')) {
        return false;
      }
      $(this).addClass('act').siblings().removeClass('act');
      arr.animate({
        "translate3d": sets[$(this).index()] + "px,0,0"
      }, 300, 'ease');

      mb.animate({
        "translate3d": -ww * $(this).index() + "px,0,0"
      }, 300, 'ease');

    })
    $(".btn").on('click', function () {
      if ($(this).closest('.role-list').hasClass('open')) {
        $(this).closest('.role-list').removeClass('open');
      } else {
        $(this).closest('.role-list').addClass('open').siblings().removeClass('open');
      }
    })

    $("#registerUser").text(this.thousandBitSeparator($("#registerUser").text()));
    $("#investUser").text(this.thousandBitSeparator($("#investUser").text()));
    $("#investMoney").text(this.thousandBitSeparator($("#investMoney").text()));
    $("#investCount").text(this.thousandBitSeparator($("#investCount").text()));

  },
  thousandBitSeparator: function (num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
};
export default  main;
