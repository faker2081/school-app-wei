import baseUrl from '@/api/env.js'
export default {
    // 查询食品留样列表,支持翻页
    foodReservedList: baseUrl + '/school/foodReserved/page',
    // 导出食品留样列表
    foodReservedExport: baseUrl + '/school/foodReserved/export',
    // 获取食品留样详细信息
    foodReservedQuery:(id)=>{
        return baseUrl+`/school/foodReserved/get/${id}`;
    },
    // 新增食品留样
    foodReservedAdd: baseUrl + '/school/foodReserved/add',
    // 修改食品留样
    foodReservedEdit: baseUrl + '/school/foodReserved/edit',
    // 删除食品留样
    foodReservedRemove:(ids)=>{
        return baseUrl+`/school/foodReserved/delete/${ids}`;
    },
    // 获取食品留样管理详细信息
    foodReservedDetailList:(id)=>{
        return baseUrl+`/school/foodReserved/getPubFoodReserved/${id}`;
    }
}