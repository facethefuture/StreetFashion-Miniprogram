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
          this.setData({
            activeIndex: event.currentTarget.dataset.activeindex
          })
        break;
        case '5': wx.switchTab({
          url: '/pages/me/me',
        })
          this.setData({
            activeIndex: event.currentTarget.dataset.activeindex
          })
        break;
        case '3': this.setData({
          showPost: true
        })
        break;
      }
      console.log(event)

    },
    close() {
      this.setData({
        showPost: false
      })
    }
  }
})
