
(function ($) {
  $.fn.frzTable = function (options) {
    const settings = $.extend(
      {
        count: {
          slide: 2,
          show: 4
        },
        speed: 0.3,
        whenClick: function () {}
      },
      options
    )

    const show = settings.count.show
    const slide = settings.count.slide
    const speed = settings.speed * 1000
    const breakPoint = 1120
  }
})(jQuery)
