// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  lifetimes: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: '0',
    showPost: false,
    color: '#8799a3',
    selectedColor: '#39b54a'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({
        showPost: false
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      switch(data.index){
        case '0':
          wx.switchTab({
            url: '/pages/index/index'
          })
          break
        case '1':
        console.log(111)
          wx.switchTab({
            url: "/pages/discovery/discovery"
          })
          break
        case '2': this.setData({
          showPost: true
        })
          break
        case '3':
          wx.switchTab({
            url: '/pages/me/me'
          })
          break
        case '4':
        console.log(4)
          wx.switchTab({
            url: '/pages/production/production'
          })
      }
    }
  }
})
