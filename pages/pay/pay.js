var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 支付事件
   * 
   * 小程序支付文档
   * https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_10&index=1
   * 支付业务流程
   * https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_4&index=3
   * 统一下单API
   * https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1
   * 小程序支付API
   * https://developers.weixin.qq.com/miniprogram/dev/api/api-pay.html
   */
  doPay: function(e) {

    // 这里模拟商品编号
    var goodsId = 128

    // 准备下单，先登录
    var token = wx.getStorageSync("token")
    if (token) {
      // 如果token存在则表明已登录
      doOrder(token, goodsId)
    } else {
      // 先登录，再下单（注意是异步操作）
      doLogin(token => doOrder(token, goodsId))
    }

  }

})

/**
 * 执行登录
 */
function doLogin(fnDoOrder) {
  wx.login({
    timeout: 200,
    success: res => {
      if (res.code) {
        wx.request({
          url: app.getDevServiceApi('/mina/login'),
          data: {
            code: res.code
          },
          success: res => {
            if (res.data) {
              // 全局存储登录状态
              wx.setStorage({
                key: 'token',
                data: res.data
              })
              // 调用下单函数
              fnDoOrder(res.data)
            }
          }
        })
      } else {
        console.log('登录失败!', res.errMsg)
      }
    }
  })
}

/**
 * 下单操作
 */
function doOrder(token, goodsId) {
  console.log('下单', token, goodsId)
  wx.request({
    url: app.getDevServiceApi('/mina/order'),
    data: {
      token: token,
      goodsId: goodsId
    },
    method: "post",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      console.log(res)
    }
  })
}