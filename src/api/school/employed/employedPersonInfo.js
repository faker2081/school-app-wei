import baseUrl from '@/api/env.js'
export default {
	// 获取机构人员分页列表
	getEmployedPage: baseUrl + '/school/employed/page',
    // 获取机构人员列表
    getEmployedList: baseUrl + '/school/employed/list',

    listEmployedGroupByOrg: baseUrl + '/school/employed/list/group/org',
    // 获取机构人员信息
    getEmployed:(id) => {
        return baseUrl + '/school/employed/get/' + id;
    },
    // 新增机构人员
    addEmployed: baseUrl + '/school/employed/add',
    // 编辑机构人员
    updateEmployed: baseUrl + '/school/employed/edit',
    // 删除机构人员信息
    delEmployed:(id) => {
        return baseUrl + '/school/employed/delete/'+id;
    },

}

