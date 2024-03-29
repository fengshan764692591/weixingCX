
// 引入
import {request} from "../../request/index.js"
// console.log(request)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取轮播图数组
    swiperList:[],
      // 获取分类导航数据
      navCateList:[],
      // 获取楼层数组
      floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getSwiperList()
  this.getNavCateList()
  this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList(){
    // var reqTask = wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata', 
    //   success: (result) => {
    //     console.log(result.data)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
      
    request({url:"/home/swiperdata"})
     .then(result=>{
      this.setData({
              swiperList:result
            })
     })
  },
  // 获取分类导航数据
  getNavCateList(){
    // var reqTask = wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/catitems', 
    //   success: (result) => {
    //     console.log(result.data)
    //     this.setData({
    //       navCateList:result.data.message
    //     })
    //   },
    // });
    request({url:"/home/catitems"})
    .then(result=>{
     this.setData({
      navCateList:result
           })
    })
  },
// 获取楼层数组
getFloorList(){
  // var reqTask = wx.request({
  //   url: 'https://api.zbztb.cn/api/public/v1/home/floordata', 
  //   success: (result) => {
  //     console.log(result.data)
  //     this.setData({
  //       floorList:result.data.message
  //     })
  //   },
  // });
  request({url:"/home/floordata"})
  .then(result=>{
   this.setData({
    floorList:result
         })
  })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})