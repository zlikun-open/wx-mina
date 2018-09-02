var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  doLogin: function(e) {
    // console.log('login', e)
    // https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html
    wx.login({
      timeout: 200,
      success: res => {
        /**
         * 通过errMsg判断请求是否成功
         * {errMsg: "login:ok", code: "061I2iuW08lo7U1ipSvW0KEeuW0I2iuW"}
         */
        console.log(res)
        if (res.code) {
          // 向开发者服务器发送code，开发者服务器与微信接口服务交互实现登录（OAuth2）
          // https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html
          wx.request({
            url: app.getDevServiceApi('/mina/login'),
            data: {
              code: res.code
            },
            success: res => {
              // res.data 为登录Token，空则表示未登录（登录失败）
              console.log('/mina/login', res)
              // 登录成功
              if (res.data) {
                // 在视图中显示登录结果
                this.setData({
                  loginApiResult: '登录成功，token = ' + res.data
                })
                // 将token信息写入storage
                wx.setStorage({
                  key: 'token',
                  data: res.data
                })
              }
            }
          })
        } else {
          console.log('登录失败!', res.errMsg)
        }
      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },

  /**
   * 并非微信API，仅用于测试登录后的业务API
   */
  doLogic: function(e) {
    var token = wx.getStorageSync('token')
    if (token) {
      // 测试调用应用API，请求时携带token作为登录凭证
      wx.request({
        url: app.getDevServiceApi('/mina/logic'),
        data: {
          token: token
        },
        success: res => {
          console.log("logic", res)
          this.setData({
            logicApiResult: res.data.status
          })
        }
      })
    } else {
      this.setData({
        logicApiResult: '需要登录'
      })
    }
  },

  doPay: function(e) {
    // console.log('payment', e)
  }

})