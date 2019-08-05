import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx.js'// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

 async getuserinfo(e){
  // console.log(e)
  // 1 获取参数
  const {encryptedData,rawData,iv,signature} = e.detail
  // 2 登录后获取 code属性
  const {code} = await login()
  console.log(code)
  // 2.5 把要提交的参数封装成一个对象
  const postParams = {encryptedData,rawData,iv,signature,code}
  // console.log(postParams)
// 3 发送请求获取token
const {token} = await request({url:"/users/wxlogin",method:"post",data:postParams})
// console.log(res)
// 4 把token存入到本地
 wx:wx.setStorageSync("token", token);
  //  5 从那里回拿去,1表示返回1层
  wx.navigateBack({
    delta: 1
  });
    
  },

})