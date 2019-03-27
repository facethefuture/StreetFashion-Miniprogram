// component/uploadImage/uploadImage.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    showPost: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    description:'',
    imageUrl: '',
    host: app.globalData.host
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(){
      console.log(this.data.description)
      this.triggerEvent('close',{},{})
      this.setData({
        imageUrl: '',
        description: ''
      })
    },
    edit(event){
      console.log(event)
      this.setData({
        description: event.detail.value
      })
      console.log(this.data.description)
    },
    addImage(){
      let _this = this
      wx.chooseImage({
        success: function(res) {
          console.log(res)
          _this.setData({
            imageUrl: res.tempFilePaths[0]
          })
        }
      })
    },
    post(){
      let _this = this
      if (!this.data.imageUrl) {
        wx.showToast({
          title: '先上传照片哦！',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      if (!this.data.description){
        wx.showToast({
          title: '说点儿什么吧',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      
      wx.uploadFile({
        url: `${this.data.host}/upload`, // 仅为示例，非真实的接口地址
        filePath: this.data.imageUrl,
        name: 'image',
        formData:{
          description: JSON.stringify(new Array(1,2,3,4))
        },
        success(res) {
          const data = res.data
          // do something
          wx.showToast({
            title: '收到你的消息啦',
            icon: 'success'
          })
          _this.hideModal()
        }
      })
    }
  }
})
