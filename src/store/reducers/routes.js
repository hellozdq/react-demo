import { ADDROUTE, REMOVEROUTE,SELECTTAB,SETPARENT } from '../constants'
import { allRoutes } from '@/router/routes'
 
/* 存储routes到localstorage start */
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("routes"));
}
function setLocalStorage(data){
    return localStorage.setItem("routes",JSON.stringify(data));
}
/* 存储routes到localstorage end */

const localRoutes = getLocalStorage("routes");

const initState = {
    activeRoute:localRoutes?localRoutes[0]:allRoutes[0],
    parentKey:[],
    data:localRoutes||[allRoutes[0]]
}
const routes = (state = initState, action)=>{
    const {type,data} = action;
    switch(type) {
        case ADDROUTE:{
            const isExist = state.data.some((item)=>{
                return item.path === data.path
            })
            if(!isExist){
                state.data = [...state.data,data];
                setLocalStorage(state.data);
            }
            state.parentKey = data.parentKey
            return {...state};
        };
        case REMOVEROUTE:{
            state.data = state.data.filter((item)=>{
                return item.path !== data;
            });
            setLocalStorage(state.data);
            return {...state};
        };
        case SELECTTAB:{
            state.activeRoute = allRoutes.find((item)=>{
                return item.path === data;
            })
            state.parentKey = state.activeRoute.parentKey;
            return {...state};
        };
        case SETPARENT:{
            state.parentKey = data;
            return {...state};
        }
        default: return state;
    }
}
export default routes