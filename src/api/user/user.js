import baseUrl from '@/api/env.js'
export default {
    //获取信息 get
	getInfo:(id)=>{
		return baseUrl+`/user/getMyUserInfo?userId=` + id;
	},
    // 编辑信息 post
    editInfo: baseUrl + '/user/updateUserInform',

    // 获取其他用户信息 get
    getOtherInfo: (id) => {
        return baseUrl + `/user/getOtherUserInfo?userId=` + id;
    },
    
    // 退出登录
    loginOut: baseUrl + '/auth/authApi/logout',
    // 修改密码
    updateUserPassword: baseUrl + '/system/user/profile/updatePwd',
    // 修改手机号
    modifyMobile: baseUrl + '/system/user/mobile/binding',
    // 校验手机号
    checkMobile: baseUrl + '/auth/authApi/checkLoginAccount',
    // 修改密码
    savePassword: baseUrl + '/system/user/resetPwd',

}