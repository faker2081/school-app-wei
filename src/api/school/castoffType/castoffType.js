import baseUrl from '@/api/env.js'
export default {
    // 查询餐厨废弃物类型列表,支持翻页
    castoffTypeList: baseUrl + '/school/pubCastoffType/page',
    // 导出餐厨废弃物类型列表
    castoffTypeExport: baseUrl + '/school/pubCastoffType/export',
    // 获取餐厨废弃物类型详细信息
    castoffTypeQuery:(id)=>{
        return baseUrl+`/school/pubCastoffType/get/${id}`;
    },
    // 新增餐厨废弃物类型
    castoffTypeAdd: baseUrl + '/school/pubCastoffType/add',
    // 修改餐厨废弃物类型
    castoffTypeEdit: baseUrl + '/school/pubCastoffType/edit',
    // 删除餐厨废弃物类型
    castoffTypeRemove:(ids)=>{
        return baseUrl+`/school/pubCastoffType/delete/${ids}`;
    }

}