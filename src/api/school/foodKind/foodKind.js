import baseUrl from '@/api/env.js'
// 菜品管理
export default {

	// 获取列表，支持翻页
	listFoodKind: baseUrl + '/school/foodKind/page',
    // 获取单个菜品信息
    getFoodKind:(id)=>{
        return baseUrl + '/school/foodKind/get/${id}';
    },
    // 新增菜品
    addFoodKind: baseUrl + '/school/foodKind/add',

    // 编辑菜品
    updateFoodKind: baseUrl + '/school/foodKind/edit',

    // 删除菜品
    delFoodKind: (id)=> {
        return baseUrl + '/school/foodKind/deleteById/${id}';
    },
}