import baseUrl from '@/api/env.js'
export default {
    // 获取晨检分页列表
	getEmployedCheckPage: baseUrl + '/school/employedCheck/page/app',
    // 获取晨检列表
    getEmployedCheckList: baseUrl + '/school/employedCheck/list',
    // 获取晨检信息
    getEmployedCheck:(id) => {
        return baseUrl + '/school/employedCheck/get/' + id;
    },
    // 新增晨检
    addEmployedCheck: baseUrl + '/school/employedCheck/add',
    // 编辑晨检
    updateEmployedCheck: baseUrl + '/school/employedCheck/edit',
    // 删除晨检信息
    delEmployedCheck:(id) => {
        return baseUrl + '/school/employedCheck/delete/'+id;
    },
}

