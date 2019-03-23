// custom-tab-bar/index.js
const app = getApp()
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
    attached() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        activeIndex: app.globalData.activeindex ? app.globalData.activeindex : '1'
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: '1',
    showPost: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(event){
      switch(event.currentTarget.dataset.activeindex){
        case '1': wx.switchTab({
          url: '/pages/index/index',
        })
          // app.setData({
          //   activeIndex: event.currentTarget.dataset.activeindex
          // })
          app.globalData.activeindex = '1'
          // this.setData({
          //   activeIndex: app.globalData.activeindex
          // })
        break;
        case '5': wx.switchTab({
          url: '/pages/me/me',
        })
        
          app.globalData.activeindex = '5'
          // this.setData({
          //   activeIndex: app.globalData.activeindex
          // })
        break;
        case '3': this.setData({
          showPost: true
        })
        break;
      }
      console.log(event)
      console.log(app.globalData.activeindex)

    },
    close() {
      this.setData({
        showPost: false
      })
    }
  }
})
