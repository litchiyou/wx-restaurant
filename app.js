//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //接入知晓云后台
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo)

    let clientID = 'b1f446e7ac159ba0b302'
    wx.BaaS.init('b1f446e7ac159ba0b302')

  },
  globalData:{
    userInfo:null
  }
})