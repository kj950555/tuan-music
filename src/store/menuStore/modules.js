// 引入state文件
import {state} from './state'
// 引入mutations文件
import {mutations} from './mutations'
export const menuModule = {
    namespaced:true,
    state,
    mutations
}