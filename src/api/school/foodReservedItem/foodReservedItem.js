import baseUrl from '@/api/env.js'
export default {
    // 查询食品留样详情列表,支持翻页
    foodReservedItemList: baseUrl + '/school/foodReservedItem/page',
    // 导出食品留样详情列表
    foodReservedItemExport: baseUrl + '/school/foodReservedItem/export',
    // 获取食品留样详情详细信息
    foodReservedItemQuery:(id)=>{
        return baseUrl+`/school/foodReservedItem/get/${id}`;
    },
    // 新增食品留样详情
    foodReservedItemAdd: baseUrl + '/school/foodReservedItem/add',
    // 修改食品留样详情
    foodReservedItemEdit: baseUrl + '/school/foodReservedItem/edit',
    // 删除食品留样详情
    foodReservedItemRemove:(ids)=>{
        return baseUrl+`/school/foodReservedItem/delete/${ids}`;
    }

}