import {ADDROUTE,REMOVEROUTE,SELECTTAB,SETPARENT} from '../constants'
export const addRoute = data => ({type:ADDROUTE,data});
export const removeRoute = data => ({type:REMOVEROUTE,data});
export const selectTab = data => ({type:SELECTTAB,data});
export const setParent = data => ({type:SETPARENT,data});