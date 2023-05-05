(function ($) {
  $.fn.frzTable = function (options) {
    const settings = $.extend(
      {
        count: {
          slide: 2,
          show: 4
        },
        speed: 0.3,
        useGrayCross: false,
        whenClick: function () {}
      },
      options
    )

    const show = settings.count.show
    const slide = settings.count.slide
    const speed = settings.speed * 1000
    const breakPoint = 1080

    const that = this
    const $table = that.find('table')
    const $cell = that.find('td')
    const $prevBtn = that.find('.prev-btn')
    const $nextBtn = that.find('.next-btn')
    const columnAmount = that.find('thead > tr > th').length - 1

    let currentCol = 0
    const cellWidth = getCellWidth($cell, currentCol, slide)

    windowResize()

    $cell.on('click', function () {
      settings.whenClick($(this))
      addActiveStyle(
        $(this),
        settings.useGrayCross ? 'gray-cross' : 'red-title'
      )
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
      $(that).css({ width: 'auto' })

      if (isSmallScreen) {
        $prevBtn.add($nextBtn).css({ display: 'block' })
        $(that).css({
          width: firstColWidth + getShowWidth($cell, currentCol, show)
        })
      }
      return firstColWidth
    }

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

    function addActiveClassStyle($element, style) {
      const columnCell = $($element).index()
      const rowCell = $($element).closest('tr').index() + 1

      $($cell).removeClass('content-active bg-active')
      $($table).find('th').removeClass('title-active')
      $($element).addClass('content-active')

      switch (style) {
        case 'gray-cross':
          $($table)
            .find(`tr td:nth-child(${columnCell + 1})`)
            .not($($element))
            .addClass('bg-active')
          $($table)
            .find(`tr:nth-child(${rowCell}) td`)
            .not($($element))
            .addClass('bg-active')
          break

        case 'red-title':
          $($table)
            .find(`tr th:nth-child(${columnCell + 1})`)
            .not($($element))
            .addClass('title-active')
          $($table)
            .find(`tbody tr:nth-child(${rowCell}) th`)
            .not($($element))
            .addClass('title-active')
          break

        default:
          throw new Error(
            'Argument should be either "gray-cross" or "red-title" [string]'
          )
      }
    }
  }
})(jQuery)
