//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [['/assets/image/vol.101.jpg', '/assets/image/vol.102.jpg', '/assets/image/vol.103.jpg', '/assets/image/vol.104.jpg']],
    currentPage: 1,
    totalPage: ''

  },
  //事件处理函数
  onLoad: function () {
    this.getList();
    
  },
  onReachBottom() {
    console.log("触底了")
    if (this.data.currentPage < this.data.totalPage){
      let page = this.data.currentPage +1
      this.getList(page)
    }
  },
  getList(page=1){
    let _this = this
    wx.request({
      url: 'http://localhost/hotRecommend',
      data: { page: page },
      method: 'GET',
      success: function (res) {
        console.log(res)
        _this.setData({
          [`list[${res.data.currentPage - 1}]`]: res.data.dataList,
          'currentPage': res.data.currentPage,
          'totalPage': res.data.totalPage
        })
        // _this.list = res.data.dataList
        console.log(_this.data.list)
      }
    })
  },
  upload(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'http://localhost/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
      
          success(res) {
            const data = res.data
            // do something
          }
        })
      }
    })
  }
})
