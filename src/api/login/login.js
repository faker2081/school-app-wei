import baseUrl from '@/api/env.js'
export default {
	// 登录
	login:baseUrl + '/company/credit',
	get:baseUrl+'/login/password/',
	// 账号登录
	accountLogin: baseUrl + '/auth/oauth/token',
	// 发送短信
	sendCode: baseUrl + '/sms/sendCode',
	// 获取用户信息
	getLoginInfo: baseUrl + '/system/user/profile',
	// 获取菜单
	getMenu: baseUrl + '/system/menu/getRouters',
	// 手机号验证
	checkVerifyCode: baseUrl + '/system/user/profile/validatorSmsCode',
	//请求地址拼接
	getPhone:(phone,code)=>{
		return baseUrl+`/system/user/profile/validatorSmsCode/${phone}/login/${code}`;
	}
}