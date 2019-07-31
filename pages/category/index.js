import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单
    leftMenuList:[],
    // 右侧的商品数组
    rightGoodsList:[],
    // 选中的菜单索引
    currentIndex:0,
    // 右侧滚动条的距离顶部的位置
    scrollTop:0
  },
  //  接口的返回值
  // 小程序中不建议把没有必要的数据定义在data中，应为内部会把data中的所有数据都会传替到WXML中
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   this.getCatagoryList()
  },
  // 获取商品数据
  getCatagoryList(){
    request({url:'/categories'})
    .then(result =>{
      // 把接口的返回值赋值给我们的全局变量
      this.Cates=result
      // console.log(result)
      // z左侧数据
      const leftMenuList = result.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      // 大家电   result[0].children
    const rightGoodsList = result[0].children
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  handleMenuChange(e){
  //  console.log(e)
  const {index} = e.currentTarget.dataset
  // 根据索引获取对应数据的内容
  const rightGoodsList = this.Cates[index].children
  this.setData({
    currentIndex:index,
    rightGoodsList,
    scrollTop:0
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