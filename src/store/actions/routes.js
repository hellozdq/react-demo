import {ADDROUTE,REMOVEROUTE,SELECTTAB,SETPARENT} from '../constants'
// 添加路由
export const addRoute = data => ({type:ADDROUTE,data});
// 删除路由
export const removeRoute = data => ({type:REMOVEROUTE,data});
// 选择Tab
export const selectTab = data => ({type:SELECTTAB,data});
// 选中设置路由的父节点
export const setParent = data => ({type:SETPARENT,data});