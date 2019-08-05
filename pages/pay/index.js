// pages/cart/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { openSetting, getSetting, chooseAddress,showModal,showToast,requestPayment } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: {},
    // 全选状态
    totalPrice: 0,
    // 总数量
    totalNum: 0,

  },

  // 显示
  onShow() {
    const address = wx.getStorageSync("address") || {}
    const cart = wx.getStorageSync("cart") || {}
    let cartArr = Object.values(cart)
    let totalPrice = 0
    let totalNum = 0
    cartArr.forEach(v => {
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } 
    })
    this.setData({ cart,totalPrice, totalNum,address})
  },
  // 点击支付
  async handleOrderPay(){
    try {
      const cart = this.data.cart
      // 1 获取本地存储中的token
      const token = wx.getStorageSync("token");
      // 2 判断有没有值
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
      }else{
        // 3 准备订单参数 用来获取，订单编号
        // 3.1 请求头
        let header = {Authorization:token}
        // 3.2 获取订单编号要的请求头参数
        // 订单的总价格
        let order_price=this.data.totalPrice
        // 订单地址
        let consignee_addr=this.data.address.all
        // 订单的商品数组
        let goods=[]
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
         if(cart[key].checked){
          goods.push({
            goods_id:cart[key].goods_id,
            goods_number:cart[key].num,
            goods_price:cart[key].goods_price
          })
         }
      }
    }
    // 3.3 发送post请求开获取参数
    // 把订单参数封装成一个数组
    let orderParams={order_price,consignee_addr,goods}
    const {order_number} = await request({url:"/my/orders/create",data:orderParams,method:"post",header:header})
      // 4 获取支付参数 pay
      const {pay} = await request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"post",header:header})
        //  5 调起微信支付
        const res = await requestPayment(pay)
        // 6 成功
        console.log(res)
      await showToast({title:"支付成功"})
      }
        
    }catch(error){
     console.log("error")
    //  发送异步请求
    await showToast({title:"支付失败"})
    }
  }
})