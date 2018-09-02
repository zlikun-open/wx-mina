// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '测试小程序'
  },
  onLoad: function() {
    this.anyLog(1, "页面加载时执行（页面）")
  },
  anyLog: function(id, message, args) {
    if (args) {
      console.log("%s - %d - %s", "index", id, message, args)
    } else {
      console.log("%s - %d - %s", "index", id, message)
    }
  }
})