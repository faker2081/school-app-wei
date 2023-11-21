import baseUrl from '@/api/env.js'
export default {
	// 登录 get
	login:(phone)=>{
		return baseUrl+`/user/login?telephone=` + phone;
	},
	// 注册 get
	register:(phone)=>{
		return baseUrl+`/user/register?telephone=` + phone;
	}
	
	
}