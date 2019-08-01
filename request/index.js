
// 同时发送ajax的次数
let ajaxTimes=0;

export const request = (params) => {
	ajaxTimes++
	// 公共的接口前缀
	// 显示正在等待的图标
	wx.showLoading({
		title: "加载中"
	});

	const baseUrl = "https://api.zbztb.cn/api/public/v1"
	return new Promise((resolve, reject) => {
		var reqTask = wx.request({
			...params,
			url: baseUrl + params.url,
			success: (result) => {
				resolve(result.data.message)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				ajaxTimes--
				if(ajaxTimes === 0){
					// 关闭看等待图标
				wx.hideLoading();
				// console.log(ajaxTimes)
			}
			}
		});
	})
}