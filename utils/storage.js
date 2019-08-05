
/**
 * 封装所有的项目中用到的本地存储的代码
 * 获取购物车条数
 */
export const getStorageCart= ()=>{
    return wx.getStorageSync("cart");
      
}
/**
 * @param {objec} obj 要填充的数据
 */
export const setStorageCart= (obj)=>{
  wx.setStorageSync("cart", obj);
        
}

// 获取商品数据列表
export const getStorageCate= ()=>{
  return wx.getStorageSync("cate");
    
}
/**
* @param {objec} obj 要填充的数据
*/
export const setStorageCate= (obj)=>{
wx.setStorageSync("cate", obj);
      
}

// // 把用户信息 
// export const getStorageCate= ()=>{
//   return wx.getStorageSync("cate");
    
// }
// /**
// * @param {objec} obj 要填充的数据
// */
// export const setStorageCate= (obj)=>{
// wx.setStorageSync("cate", obj);
      
// }