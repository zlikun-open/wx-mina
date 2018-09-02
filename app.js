// 小程序生命周期
// https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html


App({
  onLaunch: function(obj) {
    this.anyLog(1, "小程序初始化完成时执行", obj)
  },
  onShow: function(obj) {
    this.anyLog(2, "小程序启动，或从后台进入前台显示时", obj)
  },
  onHide: function() {
    this.anyLog(3, "小程序从前台进入后台时")
  },
  onError: function(error) {
    this.anyLog(4, "小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息", error)
  },
  onPageNotFound: function(obj) {
    this.anyLog(5, "小程序要打开的页面不存在时触发，会带上页面信息回调该函数", obj)
  },
  /**
   * 自定义函数，其它函数中可以直接使用this来调用（this == getApp()，但不建议直接使用getApp()，推荐使用this）
   */
  anyLog: function(id, message, args) {
    console.log('app - %d - %s', id, message, args)
  }
})