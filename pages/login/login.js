const app = getApp()

Page({
  //页面初始数据
  data: {
    userInfo: [],
  },
  //登录授权
  userInfoHandler(data) {
    var that = this
    var uid = wx.BaaS.storage.get('uid')
    wx.BaaS.handleUserInfo(data).then(res => {
      
    }, res => {
      
    })
    if (!uid) {
      wx.BaaS.login(false).then(res => {
        that.getUserInfo(res.id)
      })
    } else {
      this.getUserInfo(uid)
    }
  },
  getUserInfo: function (uid) {
    let MyUser = new wx.BaaS.User()
    MyUser.get(uid).then(res => {
      var userInfo = res.data
      console.log(userInfo)
      if (userInfo.nikename) {
        this.setData({
          userInfo: userInfo,
        })
        app.globalData.userInfo = userInfo
      } else {

        this.setData({
          userInfo: userInfo,
        })
        app.globalData.userInfo = userInfo
      }
      if(userInfo.isManager){
        wx.redirectTo({
          url: '/pages/business/business',
        })
      }else{
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      wx.setStorageSync('userInfo', userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})