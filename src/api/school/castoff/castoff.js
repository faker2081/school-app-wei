import baseUrl from '@/api/env.js'
export default {
    // 查询餐厨废弃物列表,支持翻页
    castoffList: baseUrl + '/school/castoff/page',
    // 导出餐厨废弃物列表
    castoffExport: baseUrl + '/school/castoff/export',
    // 获取餐厨废弃物详细信息
    castoffQuery:(id)=>{
        return baseUrl+`/school/castoff/get/${id}`;
    },
    // 新增餐厨废弃物
    castoffAdd: baseUrl + '/school/castoff/add',
    // 修改餐厨废弃物
    castoffEdit: baseUrl + '/school/castoff/edit',
    // 删除餐厨废弃物
    castoffRemove:(ids)=>{
        return baseUrl+`/school/castoff/delete/${ids}`;
    }

}