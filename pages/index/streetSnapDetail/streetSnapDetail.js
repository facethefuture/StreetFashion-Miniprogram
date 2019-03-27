// pages/index/streetSnapDetail/streetSnapDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {
      coverImage: '',
      createdTime: '',
      description: '',
      tags: ''
    },
    host: app.globalData.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let _this = this
    wx.request({
      url: `${this.data.host}/streetSnap/${options.id}`,
      method: 'GET',
      success: function(res) {
        console.log(res)
        res.data.createdTime = _this.dateFormat(res.data.createdTime)
        res.data.tags = res.data.tags ? JSON.parse(res.data.tags) : []
        _this.setData({
          good: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  dateFormat(val) {


    if (val) {
      let time = new Date(val * 1000)
      let year = time.getFullYear()
      let month = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      let date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
      return `${year}年${month}月${date}日`
    } else {
      return ''
    }
  },

})