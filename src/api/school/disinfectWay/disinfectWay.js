import baseUrl from '@/api/env.js'
export default {
    // 查询餐厨废弃物列表,支持翻页
    disinfectWayPage: baseUrl + '/school/pubDisinfectWay/page',
    // 查询餐厨废弃物列表
    disinfectWayList: baseUrl + '/school/pubDisinfectWay/list',
    // 导出餐厨废弃物列表
    disinfectWayExport: baseUrl + '/school/pubDisinfectWay/export',
    // 获取餐厨废弃物详细信息
    disinfectWayQuery:(id)=>{
        return baseUrl+`/school/pubDisinfectWay/get/${id}`;
    },
    // 新增餐厨废弃物
    disinfectWayAdd: baseUrl + '/school/pubDisinfectWay/add',
    // 修改餐厨废弃物
    disinfectWayEdit: baseUrl + '/school/pubDisinfectWay/edit',
    // 删除餐厨废弃物
    disinfectWayRemove:(ids)=>{
        return baseUrl+`/school/pubDisinfectWay/delete/${ids}`;
    }

}