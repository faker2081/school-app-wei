import baseUrl from '@/api/env.js'
export default {
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