// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '测试小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(obj) {
    this.anyLog(1, "页面加载时执行", obj)
    if (app.globals.userInfo) {
    // 如果全局变量中已存在登录用户信息，直接设置
      this.setData({
        hasUserInfo: true,
        userInfo: app.globals.userInfo
      })
    } else if (this.data.canIUse) {
      // 调用开放API设置用户信息
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log("请升级微信版本")
    }
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
  },

  /**
   * 获取用户信息
   */
  doGetUserInfo: function(e) {
    // 全局变量
    app.globals.userInfo = e.detail.userInfo
    // 双向绑定
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})