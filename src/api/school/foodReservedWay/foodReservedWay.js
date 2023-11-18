import baseUrl from '@/api/env.js'
export default {
    // 查询食品留样方式列表,支持翻页
    foodReservedWayList: baseUrl + '/school/pubFoodReservedWay/page',
    // 导出食品留样方式列表
    foodReservedWayExport: baseUrl + '/school/pubFoodReservedWay/export',
    // 获取食品留样方式详细信息
    foodReservedWayQuery:(id)=>{
        return baseUrl+`/school/pubFoodReservedWay/get/${id}`;
    },
    // 新增食品留样方式
    foodReservedWayAdd: baseUrl + '/school/pubFoodReservedWay/add',
    // 修改食品留样方式
    foodReservedWayEdit: baseUrl + '/school/pubFoodReservedWay/edit',
    // 删除食品留样方式
    foodReservedWayRemove:(ids)=>{
        return baseUrl+`/school/pubFoodReservedWay/delete/${ids}`;
    },
}