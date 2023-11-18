import baseUrl from '@/api/env.js'
export default {
    // 获取晨检分页列表
	getEmployedPostPage: baseUrl + '/school/pubEmployedPost/page',
    
    // 获取晨检列表
	getEmployedPostList: baseUrl + '/school/pubEmployedPost/list',
    
    // 获取晨检信息
    getEmployedPost:(id) => {
        return baseUrl + '/school/pubEmployedPost/get/' + id;
    },
    // 新增晨检
    addEmployedPost: baseUrl + '/school/pubEmployedPost/add',
    // 编辑晨检
    updateEmployedPost: baseUrl + '/school/pubEmployedPost/edit',
    // 删除晨检信息
    delEmployedPost:(id) => {
        return baseUrl + '/school/pubEmployedPost/delete/'+id;
    },
}

