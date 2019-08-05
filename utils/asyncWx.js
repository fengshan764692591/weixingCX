/**
 * promise 形势的wx.openSetting 打开授权页面
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

/**
* promise 形势的wx.getSetting 打开授权信息
*/
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

/**
* promise 形势的wx.chooseAddress 获取收货地址
*/
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

/**
* promise 形势的wx.chooseAddress 弹窗
*/
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: 'content',
            success: (res) => {
                resolve(res)
            },

        });
    })
}

/**
* promise 形势的wx.showToast 提示框
*/
export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: '',
            icon: 'none',
            success: (result) => {
                resolve(result)
            },
        });
    })
}

/**
* promise 形势的wx.login 登录
*/
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },fail(err){
           reject(err)
            }
        });
    })
}
// 创建支付
/***
 * @param {Object} pay 微信支付必须的参数
 */
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
           ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
          
    })
}