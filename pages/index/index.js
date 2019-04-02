//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    status: 0,
    currentPosition: "order0",
    menuItems: [],
    imgUrls: [
      "/images/1.jpg",
      "/images/1.jpg",
      "/images/1.jpg"
    ]
  },

  //根据侧边栏切换菜单
  changeMenu: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      status: index,
      currentPosition: "order" + index
    })
  },

  scrollBottom: function () {
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    setTimeout(function(){
      wx.hideLoading();
    },1000)
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  plus: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var num = that.data.postList[index].num;
    if (num > 1) {
      num--;
    } else {
      wx.showModal({
        title: '',
        content: '是否删除此菜品?',
        success: function (res) {
          if (res.confirm) {
            carts.splice(index, 1);
            that.setData({
              postList: carts
            });
            if (that.data.postList.length < 1) {
              that.setData({
                cartListShow: false,
                showModal: true
              });
            }
          } else if (res.cancel) {
            return;
          }
        }
      })
    }
    var carts = that.data.postList;
    carts[index].num = num;
    that.setData({
      postList: carts
    });
    //this.data.postList[index].num;
  },
  add: function (e) {
    var index = e.currentTarget.dataset.index;
    var num = this.data.postList[index].num;
    num++;
    var carts = this.data.postList;
    carts[index].num = num;
    this.setData({
      postList: carts
    });
  },
  
  onLoad: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    let that = this
    let menuTablename = 'menu'
    let menu = new wx.BaaS.TableObject(menuTablename)   //从知晓云获取数据表对象
    let query = new wx.BaaS.Query()
    menu.orderBy('orderStatus').find().then(res => {
      that.setData({
        menuItems: res.data.objects
      })
      console.log(res.data.objects)
    })
  },
})
