// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQrcodeModule: false,
    moduleList: [],
    host: app.globalData.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhotographyModules()
  
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: '2'
      })
    }
  },
  showQrcode(){
    this.setData({
      showQrcodeModule: true
    })
  },
  hideQrcode() {
    this.setData({
      showQrcodeModule: false
    })
  },
  getPhotographyModules(){
    wx.showLoading({
      title: '加载中'
    })
    let _this = this
    wx.request({
      url: `${this.data.host}/queryPhotographyModule`,
      method: 'GET',
      success: function(res){
        console.log(res)
        _this.setData({
          moduleList: res.data.dataList
        })
        wx.hideLoading()
      },
      fail:function(res){
        console.log(res)
        wx.hideLoading()
      }
    })
  }
})