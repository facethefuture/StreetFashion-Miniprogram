//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [['/assets/image/vol.101.jpg', '/assets/image/vol.102.jpg', '/assets/image/vol.103.jpg', '/assets/image/vol.104.jpg']]
  },
  //事件处理函数
  onLoad: function () {
    wx.request({
      url: 'http://localhost/hotRecommend?page=1:',
      method: 'GET'
    })
    
  }
})
