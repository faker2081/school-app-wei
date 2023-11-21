import baseUrl from '@/api/env.js'
export default {
	// 发送帖子 post
  send: baseUrl+`/post/userPost`,
	
  // 更新帖子信息 post
  update: baseUrl+`/post/updatePost`,
	
	// TODO 删除帖子（未填） delete
  delete: (userId, postId) => {
    return baseUrl+`/post/deletePost?userId=${userId}&postId=${postId}`;
  },
	// 通过标题或正文搜索帖子 post
  searchPostByContext: baseUrl+`/post/selectPostByContext`,
	
	// 点赞帖子 get
  like: (userId, postId) => {
    return baseUrl+`/post/likePost?userId=${userId}&postId=${postId}`;
  },

  // 取消点赞帖子 get
  cancelLike: (userId, postId) => {
    return baseUrl+`/post/cancelLikePost?userId=${userId}&postId=${postId}`;
  },

  // 收藏帖子 get
  collect: (userId, postId) => {
    return baseUrl+`/post/collectPost?userId=${userId}&postId=${postId}`;
  },

  // 取消收藏帖子 get
  cancelCollect: (userId, postId) => {
    return baseUrl+`/post/cancelCollectPost?userId=${userId}&postId=${postId}`;
  },

  // 评论帖子 post
  comment: baseUrl+`/post/commentPost`,

  // TODO 取消评论帖子 Delete
  cancelComment: (postCommentId) => {
    return baseUrl+`/post/deleteCommentPost?postCommentId=${postCommentId}`;
  },

  // 用户举报帖子 post
  report: baseUrl+`/post/reportPost`,

  // 获取帖子详情 get
  getPostDetail: (userId, postId) => {
    return baseUrl+`/post/getPostDetail?userId=${userId}&postId=${postId}`;
  },

  // 获取用户点赞过的帖子列表 post
  getLikePostList: baseUrl+`/post/getMyLikePost` ,

  // 获取用户收藏过的帖子列表 post
  getCollectPostList: baseUrl+`/post/getMyCollectPost`,

  // 获取用户个人的帖子列表 post
  getPostList: baseUrl+`/post/selectPost`,

  // 通过标签，地区，话题搜索帖子 post
  searchPostByCondition: baseUrl+`/post/getPostByCondition`,

  // 获取关注者的帖子 post
  getFollowPostList: baseUrl+`/post/getMyFollowPost`,

  // 分页获取热门帖子列表 post
  getHotPostList: baseUrl+`/post/getHotPost`,

  // 获取用户被点赞数和被收藏数 get
  getLikeAndCollectCount: (userId) => {
    return baseUrl+`/post/selectMyPostLikeAndCollect?userId=${userId}`;
  },
}