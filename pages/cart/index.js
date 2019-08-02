// pages/cart/index.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
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
    this.setData({
      address:wx.getStorageSync("address")||{}
    })
  }

})