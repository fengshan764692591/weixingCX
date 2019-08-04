// pages/goods_detail/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCart,setStorageCart} from "../../utils/storage.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },
  // 全局的商品对象
  GoodsObj: {},
  // 获取商品的详情信息
  async getGoodsDetail(goods_id) {
    const result = await request({ url: '/goods/detail', data: { goods_id } })
    this.GoodsObj = result
    // console.log(result)
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics: result.pics,
        // 全部替换 webp -- jpg
        goods_introduce: result.goods_introduce.replace(/\.webp/g,'.jpg')

      }
    })
  },

  onLoad(options) {
    // console.log(options)
    this.getGoodsDetail(options.goods_id)
  },
  // 点击放大图片
  handlePreviewImage(e) {
    const { index } = e.currentTarget.dataset
    const urls = this.data.goodsInfo.pics.map(v => v.pics_big)
    // console.log(urls)
    // current第一张
    const current = urls[index]
    wx.previewImage({
      current,
      urls,
    });

  },
  // 加入购物车
  handleCartAdd() {
    // 1获取本地存储中购物车对象
    // let cart = wx.getStorageSync("cart") || {};
    let cart = getStorageCart() || {}
    // 2.判断当前的商品是否已经购买了 if(cart[商品id])
    if (cart[this.GoodsObj.goods_id]) {
      // 2.1 已经存在旧数据
      cart[this.GoodsObj.goods_id].num++
    } else {
      // 2.2 第一次添加
      cart[this.GoodsObj.goods_id] = this.GoodsObj
      cart[this.GoodsObj.goods_id].num = 1
      cart[this.GoodsObj.goods_id].checked = true
    }
    //3 把数据存储到本地
    // wx.setStorageSync("cart", cart);
    setStorageCart(cart)
    // 4 弹出提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });

  }
})