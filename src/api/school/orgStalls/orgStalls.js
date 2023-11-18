import baseUrl from '@/api/env.js'
export default {
    // 查询档口基本信息列表,支持翻页
    orgStallsList: baseUrl + '/school/stalls/page',
    // 导出档口基本信息列表
    orgStallsExport: baseUrl + '/school/stalls/export',
    // 获取档口基本信息详细信息
    orgStallsQuery:(id)=>{
        return baseUrl+`/school/stalls/get/${id}`;
    },
    // 新增档口基本信息
    orgStallsAdd: baseUrl + '/school/stalls/add',
    // 修改档口基本信息
    orgStallsEdit: baseUrl + '/school/stalls/edit',
    // 删除档口基本信息
    orgStallsRemove:(ids)=>{
        return baseUrl+`/school/stalls/delete/${ids}`;
    }

}