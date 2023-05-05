
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

    const $table = this
    const $cell = $table.find('td')
    const $prevBtn = $table.find('.prev-btn')
    const $nextBtn = $table.find('.next-btn')

    let currentCol = 0
    const cellWidth = getCellWidth($cell, currentCol, slide)

    windowResize()

    $($cell).on('click', function () {
      settings.whenClick($(this))
    })

    $(window).resize(
      debounce(function () {
        windowResize()
      }, 300)
    )

    $($prevBtn).click(function () {
      animateTable('prev', cellWidth)
    })
    $($nextBtn).click(function () {
      animateTable('next', cellWidth)
    })

    // table 初始化
    function init() {
      const isSmallScreen = $(window).width() <= breakPoint
      const firstColWidth = that.find('th:first')[0].offsetWidth

      $prevBtn.add($nextBtn).css({ display: 'none' })

      if (isSmallScreen) {
        $prevBtn.add($nextBtn).css({ display: 'block' })
        $($table).css({
          width: firstColWidth + getShowWidth($cell, currentCol, show)
        })
      }
      const cellWidth = getCellWidth($cell, currentCol, slide)

    // 如果使用者 resize window 執行
    function windowResize() {
      const firstColWidth = init()
      $($prevBtn).css({ left: firstColWidth })
      $($nextBtn).css({ right: 0 })
    }

    // M 版時，取得「畫面 show 幾格 cell」的總寬
    function getShowWidth(element, colIndex, showCol) {
      const array = Array.from(element).map((i) => i.offsetWidth)
      const width = array
        .slice(colIndex, colIndex + showCol)
        .reduce((a, b) => a + b, 0)
      return width
    }

    // M 版時，取得「一次要動幾格 cell」的總寬
    function getCellWidth(element, colIndex, slideCount) {
      const array = Array.from(element).map((i) => i.offsetWidth)
      return array.slice(colIndex, slideCount).reduce((a, b) => a + b, 0)
    }

    function animateTable(direction, width) {
      let symbol
      switch (direction) {
        case 'prev':
          symbol = '-'
          break
        case 'next':
          symbol = '+'
          break
        default:
          throw new Error('Argument should be either "prev" or "next" [string]')
      }
      $table.animate({ left: `${symbol}=${width}px` }, speed, 'swing')
    }

    function debounce(func, wait, immediate) {
      let timeout
      return () => {
        const context = this
        const later = () => {
          timeout = null
          if (!immediate) func.apply(context, arguments)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, arguments)
      }
    }
  }
})(jQuery)
