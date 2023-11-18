import baseUrl from '@/api/env.js'
export default {
    // 查询餐用具消毒详情列表,支持翻页
    disinfectItemList: baseUrl + '/school/disinfectItem/page',
    // 导出餐用具消毒详情列表
    disinfectItemExport: baseUrl + '/school/disinfectItem/export',
    // 获取餐用具消毒详情详细信息
    disinfectItemQuery:(id)=>{
        return baseUrl+`/school/disinfectItem/get/${id}`;
    },
    // 新增餐用具消毒详情
    disinfectItemAdd: baseUrl + '/school/disinfectItem/add',
    // 修改餐用具消毒详情
    disinfectItemEdit: baseUrl + '/school/disinfectItem/edit',
    // 删除餐用具消毒详情
    castoffRemove:(ids)=>{
        return baseUrl+`/school/disinfectItem/delete/${ids}`;
    }

}