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
   * 获取用户信息（验证签名）
   */
  doGetUserInfo: function(e) {
    var token = wx.getStorageSync('token')
    wx.getUserInfo({
      success: res => {
        // rawData    "{"nickName":"张立坤","gender":1,...}"
        // signature  "1ee56bd158059c2d645779cb8a73dd3a341d45a6"
        // iv         "9dRsa0fxixoxtwr0OwHsSA=="
        console.log(res)
        // 执行验签，需要注意session_key有时效性，完整程序应验证其有效性（根据实际需求制定验证策略）
        // https://developers.weixin.qq.com/miniprogram/dev/api/signature.html
        wx.request({
          url: app.getDevServiceApi('/mina/verify_signature'),
          data: {
            token: token,
            signature: res.signature,
            userRawInfo: res.rawData
          },
          // post请求时需要下面的header，否则后端无法接收到请求参数
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            console.log("verify_signature", res)
            if (res.data) {
              this.setData({
                verifySignatureResult: "验证签名成功"
              })
            }
          }
        })
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