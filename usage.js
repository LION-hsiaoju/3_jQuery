$('.frzTable.default').frzTable({
  count: {
    // M 版時每次點擊往前往後移動幾格儲存格 [number]
    slide: 2,
    // M 版時一個畫面 show 幾格儲存格 [number]
    show: 4
  },
  // 設定花多久時間移動完成
  speed: 0.4,

  // 每次點擊儲存格時會執行此 callback，並帶入所點擊的儲存格 jquery 物件
  whenClick: function ($element) {
    console.log($element)
  }
})

$('.frzTable.rel').frzTable({
  count: { slide: 1, show: 3 },
  speed: 0.3,
  whenClick: function ($element) {
    console.log($element)
  }
})
