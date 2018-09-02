// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '测试小程序'
  },
  onLoad: function(obj) {
    this.anyLog(1, "页面加载时执行", obj)
  },
  onShow: function() {
    this.anyLog(2, "页面显示/切入前台时触发")
  },
  onReady: function() {
    this.anyLog(3, "页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。")
  },
  onHide: function() {
    this.anyLog(4, "页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。")
  },
  onUnload: function() {
    this.anyLog(5, "页面卸载时触发。如redirectTo或navigateBack到其他页面时。")
  },
  anyLog: function(id, message, args) {
    if (args) {
      console.log("%s - %d - %s", "index", id, message, args)
    } else {
      console.log("%s - %d - %s", "index", id, message)
    }
  }
})