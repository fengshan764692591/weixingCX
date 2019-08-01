import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单
    leftMenuList: [],
    // 右侧的商品数组
    rightGoodsList: [],
    // 选中的菜单索引
    currentIndex: 0,
    // 右侧滚动条的距离顶部的位置
    scrollTop: 0,

  },
  //  接口的返回值
  // 小程序中不建议把没有必要的数据定义在data中，应为内部会把data中的所有数据都会传替到WXML中
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    // 1.获取缓存数据
    const cates = wx.getStorageSync("cates");

    // 2. 判断有没有缓存数据,没有就发请求
    if (!cates) {
      this.getCatagoryList()
    } else {
      // 有缓存数据
      // 判断数据是否过期，假设过期时间是10s
      if (Date.now() - cates.time > 1000 * 10) {
        // 过期了
        this.getCatagoryList()
      } else {
        // 获取缓存数据
        const catesData = cates.data
        this.Cates = catesData
        // z左侧数据
        const leftMenuList = this.Cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
        // 大家电   result[0].children
        const rightGoodsList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }



  },
  // 获取商品分类数据
  async getCatagoryList() {
    const result = await request({ url: '/categories' })
    // 把接口的返回值赋值给我们的全局变量
    this.Cates = result
    // 把我们的数据存入到缓存中  ｛当前时间，数据｝
    wx.setStorageSync("cates", { time: Date.now(), data: result });

    // console.log(result)
    // z左侧数据
    const leftMenuList = this.Cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
    // 大家电   result[0].children
    const rightGoodsList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightGoodsList
    })
  },
  // 左侧菜单点击事件
  handleMenuChange(e) {
    //  console.log(e)
    const { index } = e.currentTarget.dataset
    // 根据索引获取对应数据的内容
    const rightGoodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
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