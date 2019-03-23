//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [['/assets/image/vol.101.jpg', '/assets/image/vol.102.jpg', '/assets/image/vol.103.jpg', '/assets/image/vol.104.jpg']],
    currentPage: 1,
    totalPage: '',
    description:'',
    host: app.globalData.host
  },
  //事件处理函数
  onLoad: function () {
    this.getList();
    
  },
  onReachBottom() {
    console.log("触底了")
    if (this.data.currentPage < this.data.totalPage){
      let page = this.data.currentPage +1
      this.getList(page,this.data.description)
    }
  },
  getList(page=1,description){
    wx.showLoading({
      title: '加载中'
    })
    let _this = this
    wx.request({
      url: 'http://localhost/hotRecommend',
      data: description ? {page,description} : { page: page},
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
        wx.hideLoading()
      },
      fail: function(res){
        wx.hideLoading()
      }
    })
  },
  seachPicture(event){
    console.log(event)
    this.setData({
      currentPage: 1,
      list: [],
      description: this.data.description
    })
    if (this.data.description !== ''){
      this.getList(1, this.data.description)
    } else{
      this.getList()
    }
    
  },
  edit(event){
    this.setData({
      description: event.detail.value
    })
  }
})
