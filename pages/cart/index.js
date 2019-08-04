// pages/cart/index.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
    // 全选状态
    isAllChecked:true,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },

  async handleChooseAddress(){
    // 1 获取用户的授权信息
    const res1 =  await getSetting()
    const scopeAddress = res1.authSetting["scope.address"]
    if(scopeAddress === true || scopeAddress === undefined){
      // 1.1 直接调用用户的收货地址
    }else{
      // 2.1 先打开授权页面
      await openSetting()
     
    }
    const res2=await chooseAddress()
    console.log(res2)
    // 1.3 存入到本地
    res2.all=res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
    wx.setStorageSync("address", res2);
      
  },
  // 显示
  onShow(){
    const address=wx.getStorageSync("address")||{}
    const cart=wx.getStorageSync("cart")||{}
    this.setData({
       address,cart
    })
    this.setCart(cart)
  },
  // 1 计算  全选
 setCart(cart){
    // 0 把对象转换为数组
    // 把对象中的值 提取出来，变成一个数组
    let cartArr=Object.values(cart)
    // 1 计算 全选
    // every 会接收回调函数 数组循环的时候，这个回调函数要求都返回true
    // 那么 every 的返回值才是true 否则为false
    // let isAllChecked=cartArr.every(v=>v.checked)
    let isAllChecked = true
    // 2 计算总价格
    let totalPrice=0
    // 3 计算 要购买的总数量
    let totalNum=0
    cartArr.forEach(v=>{
      if(v.checked){
        // 选中了
        totalPrice +=v.num*v.goods_price
        totalNum +=v.num
      }else{
        isAllChecked=false
      }
    })
    this.setData({cart,isAllChecked,totalPrice,totalNum})
    wx.setStorageSync('cart', cart);
 },
  // 商品的复选框选中的事件
  handleCartCheck(e){
    console.log(e)
    // 1 获取要修改的商品id
    const {id} = e.currentTarget.dataset
    // 2 获取data中的购物车对象
    let {cart}=this.data
    // 3 选中状态的取反
    cart[id].checked=!cart[id].checked
    // 4 把cart重新设置回data中和缓存中
 
      // 5 从新计算价格
      this.setCart(cart)
  },
  //  修改全选
  handleCateAllCheck(){
  // 1 获取data中的数据
  let {isAllChecked,cart}=this.data
  // 2 给全选按钮进行 取反
  isAllChecked=!isAllChecked
  // 3 拿购物车对象那个循环
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
     cart[key].checked=isAllChecked
      
    }
  }
  this.setCart(cart)
  }

})