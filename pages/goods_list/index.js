import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   goodsList:[],
   tabs:[
    {id:0, title:"综合",isActive:true},
    {id:0, title:"销量",isActive:false},
    {id:0, title:"价格",isActive:false}
  ]

  },
   // 接口用的参数
    QueryParams:{
   //搜索关键字
   query:'',
   cid:'',
   pagenum:1,
   pagesize:10
    },
  // 总页数
  TotalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(options)
    this.QueryParams.cid=options.cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList(){
    const result = await request({url:"/goods/search", data:this.QueryParams})
    // console.log(result)
       // 计算总页数
       this.TotalPages=Math.ceil(result.total/this.QueryParams.pagesize)
       this.setData({
         // 拼接数组，旧数组+新数组
         goodsList:[...this.data.goodsList,...result.goods],
         
       })
       // 关闭页面下拉刷新效果
       wx.stopPullDownRefresh();
  },
 
// 子组件触发的事件
handleItemChange(e){
  // console.log(e)
  // 获取传递过来的索引
  const {index}=e.detail
// 获取tabs数组
let {tabs} = this.data
// 循环修改tabs数组
tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
this.setData({tabs})

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
     this.QueryParams.pagenum=1
     this.setData({
       goodsList:[]
     })
     this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('2222')
    // 1 判断有没有下一页数据
    if(this.QueryParams.pagenum >= this.TotalPages){
      // console.log('没有下一页数据')
      wx.showToast({
        title: '没有下一页了',
       icon:"none"
      });
        
    }else{
      // console.log('还有下一页数据')
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

  