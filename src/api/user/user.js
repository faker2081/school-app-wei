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

    // 用户关注另一个用户 get
    followUser: (followerId, followId) => {
        return baseUrl + `/user/followUser?followerId=` + followerId + '&followId=' + followId;
    },
    // 取消关注 get
    cancelFollowUser: (followerId, cancelFollowId) => {
        return baseUrl + `/user/cancelFollowUser?followerId=` + followerId + '&cancelFollowId=' + cancelFollowId;
    },
    
    // 获取关注者列表 get
    getFollows: (userId) => {
        return baseUrl + `/user/getFollow?userId=` + userId;
    },
    // 获取粉丝列表 get
    getFollowers: (userId) => {
        return baseUrl + `/user/getFollower?userId=` + userId;
    },

    // 通过搜索用户名精确匹配用户 get
    searchUserByName: (username) => {
        return baseUrl + `/user/searchUserByUserName?userName=` + username;
    },

    // 用户上传反馈 post 
    uploadFeedback: baseUrl + '/user/uploadFeedback',

    // 用户获取自己的反馈 post
    getFeedback: baseUrl + '/user/getOurFeedback',

    // 用户获取最新的应用和隐私政策 get
    getNewApp: baseUrl + '/user/getNewApp',

    // 用户获取自己的提醒（通知）
    getRemind: (userId) => {
        return baseUrl + `/user/getMyRemind?userId=` + userId;
    },

    // 发送验证码 get
    sendCode: (telephone, code) => {
        return baseUrl + `/user/sendCode?telephone=` + telephone + '&code=' + code;
    },
}