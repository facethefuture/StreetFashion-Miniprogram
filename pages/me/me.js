// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQrcodeModule: false,
    moduleList: [],
    host: app.globalData.host,
    list: [['/assets/image/vol.101.jpg', '/assets/image/vol.102.jpg', '/assets/image/vol.103.jpg', '/assets/image/vol.104.jpg']],
    currentPage: 1,
    totalPage: '',
    description: '',
    dataList: [],
    columnLeft: [],
    columnRight: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhotographyModules()
    this.getList();
  
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
  },
  onReachBottom() {
    console.log("触底了")
    if (this.data.currentPage < this.data.totalPage) {
      let page = this.data.currentPage + 1
      this.getList(page, this.data.description)
    }
  },
  getList(page = 1, description) {
    wx.showLoading({
      title: '加载中'
    })
    let _this = this
    wx.request({
      url: `${this.data.host}/photography`,
      data: description ? { page, description } : { page: page },
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
       let arr = []
        let column1 = []
         let column2 = []
       _this.data.list.forEach((item, index) => {
        
         item.forEach((item2, index2) => {
           if (index2 % 2 === 0) {
              column1.push(item2)
           } else {
             column2.push(item2)
           }
            arr.push(item2)
         })
  
       })
    
        _this.setData({
          dataList: arr,
          columnLeft: column1,
          columnRight: column2
        })
        console.log(_this.data.columnLeft)
        console.log(_this.data.columnRight)
        console.log(_this.data.dataList)
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
      }
    })
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
  },
  jump(event) {
    console.log(event)
    wx.navigateTo({
      url: `/pages/me/photographyDetail/photographyDetail?id=${event.currentTarget.dataset.id}`,
    })
  },
  doLogin () {
    wx.request({
      url: 'https://localhost/login',
      method: 'POST',
      data: {
        username: 'admin',
        password: '123'
      }
    })
  },
    doLogin2() {
    wx.request({
      url: 'https://localhost/photography',
      method: 'GET',
      header: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU1NDA0MzIwNH0.yQReREhLVFWI2lkXbLQGmx3VoVoe3JzF5duPvCcs3w4RyGcYHyYzx1m3z3P-p4jN2ao6Qwqn4FPO-cfevWIZRw'
      },
      success(res){
        console.log(res)
      }
    })
  },
  loadLeft(e){
    console.log(e)
  },
  loadRight(e){
    console.log(e)
  }
})