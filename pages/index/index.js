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
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: '0'
      })
    }
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
      url: `${this.data.host}/hotRecommend`,
      data: description ? {page,description} : { page: page},
      method: 'GET',
      success: function (res) {
        console.log(res)
        res.data.dataList.forEach((item) => {
          item.createdTime = _this.dateFormat(item.createdTime)
        })
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
    if(event.detail.value == ''){
      this.setData({
        currentPage: 1,
        list: []
      })
      this.getList()
    }
  },
  dateFormat(val) {
    
 
    if (val) {
      let time = new Date(val * 1000)
      let year = time.getFullYear()
      let month = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      let date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
      return `${year}-${month}-${date}`
    } else {
      return ''
    }
  }
})
