//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World 哥',
    userInfo: {},
    array: [
      {
        name: '首页',
        url: 'index'
      },
      {
        name: '课程',
        url: 'course'
      },
      {
        name: '机构',
        url: 'groups'
      },
      {
        name: '我的',
        url: 'vip'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  alertSome1: function() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })   
  },
  alertSome2: function() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })    
  },  
  go: function(e) {
      console.log(e.target);
      wx.navigateTo({
        url: '../'+ e.target.id + '/'+ e.target.id
      })
  }
})
