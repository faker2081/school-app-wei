/* —————————————— 网络请求 ———————————————— */
/* TODO： 封装头部调整
 * 异步请求封装，提供get、post的异步函数
 */
//请求返回参数
let httpServe = (resolve, res) =>{
	if (res.statusCode == 200) {
		resolve(res.data);
	} else if (res.statusCode == 401) {
		//没有token 或者 token 过期 跳转到登录
		uni.showToast({
			title: res.data.msg || '未认证或认证已过期，请重新登录',
			icon: 'none',
			duration: 1000,
			mask: true,
			success() {
				setTimeout(() => {
					// uni.reLaunch({
					// 	url: '/pages/purchase/index/index'
					// })
				}, 1000);
			}
		});
	} else if (res.statusCode == 500) {
		uni.showToast({
			title: res.data.msg || '获取数据失败',
			icon: 'none',
			duration: 2000,
		});
		// resolve(res.data);
	}else {
        uni.showToast({
            title: res.data.msg || '获取数据失败',
            icon: 'none',
            duration: 2000,
        });
    }
}
// HTTP: GET/POST封装
let http = {
    // Loading METHOD
    initload() {
        uni.showLoading({
            title: '加载中',
            mask: true,
        })
    },

    // HEADER 请求头配置
    handleHeader(type, grant_type, login) {
        let headers = {};
        if (type === 'HEADER_JSON') {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        } else if (type === 'HEADER_XWWW') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else if (type === 'FORM_DATA') {
            headers['Content-Type'] = 'multipart/form-data';
        }

        if(grant_type) {
            console.log(grant_type)
            headers['grant_type'] = grant_type;
        }
        headers['wx'] = true;

        if (login) {
            // header注入token
            headers['Authorization'] = 'Basic amtyX2FkbWluX2NsaWVudDoxMjM0NTY=';
        } else {
            if (uni.getStorageSync("token")) {
                headers['Authorization'] = uni.getStorageSync("token");
            } else {
                headers['Authorization'] = '';
            }
        }
        headers['withCredentials'] = false;
        return headers;
    },
    /**
     * get方法，
     * @param {String} url [请求的url地址]
     * @param {Object} param[请求携带的参数]
     * @param {Boolean} loading[请求弹窗]
     * @param {String} type[请求头content-type参数]
     * @param {String} grant_type[请求头grant_type参数]
     * @param {Boolean} login[是否登录存入请求头]
     **/
    get: function (url, param, loading = true, type = 'HEADER_XWWW', grant_type = '', login = false) {
        if (loading) this.initload(); // loading加载中
		let header = this.handleHeader(type, grant_type, login)
        if (!url) return 0; // url为空关闭函数
        console.log(url)
        return new Promise(function (resolve, reject) {
            uni.request({
                url: url,
                data: param || {},
                header: header,
                method: "GET",
                success: (res) => {
                    uni.hideLoading();
                    httpServe(resolve, res)
                },
                fail: (err) => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '网络错误',
                        duration: 2000
                    });
                    reject(err);
                }
            });
        });
    },
    /**
     * delete方法
     * @param {String} url [请求的url地址]
     * @param {Object} param[请求携带的参数]
     * @param {Boolean} loading[请求弹窗]
     * @param {String} type[请求头content-type参数]
     * @param {String} grant_type[请求头grant_type参数]
     * @param {Boolean} login[是否登录存入请求头]
     **/
    delete: function (url, param, loading = true, type = 'HEADER_XWWW', grant_type = '', login = false) {
        if (loading) this.initload();
		let header = this.handleHeader(type, grant_type, login)
        if (!url) return 0;
        return new Promise(
            function (resolve, reject) {
                uni.request({
                    url: url,
                    data: param || {},
                    header: header,
                    method: "DELETE",
                    success: (res) => {
                        uni.hideLoading();
                        httpServe(resolve, res)
                    },
                    fail: (err) => {
                        uni.hideLoading();
                        uni.showToast({
                            title: '网络错误',
                            duration: 2000
                        });
                        reject(err);
                    }
                });
            }
        )
    }, 
    /**
     * post方法，
     * @param {String} url [请求的url地址]
     * @param {Object} param[请求携带的参数]
     * @param {Boolean} loading[请求弹窗]
     * @param {String} type[请求头content-type参数]
     * @param {String} grant_type[请求头grant_type参数]
     * @param {Boolean} login[是否登录存入请求头]
     **/
    post: function (url, param, loading = true, type = 'HEADER_JSON', grant_type = '', login = false) {
        if (loading) this.initload();
        console.log(grant_type,login);
		let header = this.handleHeader(type, grant_type, login)
        if (!url) return 0;
        return new Promise(function (resolve, reject) {
            uni.request({
                url: url,
                data: param || {},
				header: header,
                method: "POST",
                success: (res) => {
                    uni.hideLoading();
                    httpServe(resolve, res)
                },
                fail: (err) => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '网络错误',
                        duration: 2000
                    });
                    reject(err);
                }
            });
        });
    },
    /**
     * upload方法，
     * @param {String} url [请求的url地址]
     * @param {Object} param[请求携带的参数]
     * @param {Boolean} loading[请求弹窗]
     * @param {String} type[请求头content-type参数]
     * @param {String} grant_type[请求头grant_type参数]
     * @param {Boolean} login[是否登录存入请求头]
     **/
    upload: function (url, formData, loading, type = 'FORM_DATA', grant_type = '', login = false) {
        if (loading) this.initload();
		let header = this.handleHeader(type, grant_type, login)
        if (!url) return 0;
        return new Promise(function (resolve,reject){
            uni.uploadFile({
                url: url,
                name: 'file',
                header: header,
                formData: formData,
                success: (res) => {
                    uni.hideLoading();
                    httpServe(resolve, res);
                },
                fail: (err) => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '网络错误',
                        duration: 2000
                    });
                    reject(err);
                }
            })
        })
    },
    asyncPost: function (url, param, loading,type = 'HEADER_JSON', grant_type = '', login = false) {
        return new Promise((resolve, reject) => {
            this.post(url, param, loading,type, grant_type, login).then(res => {
                resolve(res)
            });
        });
    },
    asyncGet: function (url, param, loading,type = 'HEADER_JSON', grant_type = '', login = false) {
        return new Promise((resolve, reject) => {
            this.get(url, param, loading,type, grant_type, login).then(res => {
                resolve(res);
            });
        });
    },
    asyncDelete: function (url, param, loading,type = 'HEADER_JSON', grant_type = '', login = false) {
        return new Promise((resolve, reject) => {
            this.delete(url, param, loading,type, grant_type, login).then(res => {
                resolve(res);
            });
        });
    },

};

export default http;