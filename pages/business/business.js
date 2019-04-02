//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currtab: 0,
    swipertab: [{ name: '菜单', index: 0 }, { name: '添加', index: 1 }, { name: '删除', index: 2 }],
    status: 0,
    currentPosition: "order0",
    menuItems: [],
    menuName: '',
    menuPrice: 0,
    menuStatus: ["推荐", "粤菜", "汤水","套餐"],
    menuStatusIndex: 0,
    files: []
  },

  /**
* @Explain：选项卡点击切换
*/
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
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
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading();
    }, 1000)
  },
  menuNameInput:function(e){
    this.setData({
      menuName: e.detail.value
    })
    console.log(e.detail.value)
  },
  menuPriceInput: function (e) {
    this.setData({
      menuPrice: parseInt(e.detail.value)
    })
  },
  menuStatusChange: function (e) {
    this.setData({
      menuStatusIndex: parseInt(e.detail.value)
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //添加菜单信息到后台
  addMenu: function(e){
    let tablename = 'menu'
    let Product = new wx.BaaS.TableObject(tablename)
    let product = Product.create()
    let MyFile = new wx.BaaS.File()
    let fileParams = { filePath: this.data.files[0] }
    console.log(fileParams)
    MyFile.upload(fileParams).then(res => {
      console.log(res.data)
      product.set('image', res.data.file)
      product.set('cookname',this.data.menuName)
      product.set('price', this.data.menuPrice)
      product.set('orderStatus', this.data.menuStatusIndex)
      product.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  //删除菜单
  deleteMenu:function(){
    let tableName = 'menu'
    let Product = new wx.BaaS.TableObject(tableName)
    let menuname = this.data.menuName
    let menuStatusIndex = this.data.menuStatusIndex
    let query = new wx.BaaS.Query()
    query.contains('cookname', menuname)
    query.compare('orderStatus', '=', menuStatusIndex)
    Product.delete(query).then(res => {
      console.log(res)
    })
  },

  onLoad:function(){
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