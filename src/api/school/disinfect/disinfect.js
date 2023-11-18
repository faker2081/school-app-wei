import baseUrl from '@/api/env.js'
export default {
    // 查询餐用具消毒列表,支持翻页
    disinfectList: baseUrl + '/school/disinfect/page',
    // 导出餐用具消毒列表
    disinfectExport: baseUrl + '/school/disinfect/export',
    // 获取餐用具消毒详细信息
    disinfectQuery:(id)=>{
        return baseUrl+`/school/disinfect/get/${id}`;
    },
    // 新增餐用具消毒
    disinfectAdd: baseUrl + '/school/disinfect/add',
    // 修改餐用具消毒
    disinfectEdit: baseUrl + '/school/disinfect/edit',
    // 删除餐用具消毒
    disinfectRemove:(ids)=>{
        return baseUrl+`/school/disinfect/delete/${ids}`;
    },
    // 获取餐用具消毒详细信息
    disinfectDetailList:(id)=>{
        return baseUrl+`/school/disinfect/getPubDisinfect/${id}`;
    }
}