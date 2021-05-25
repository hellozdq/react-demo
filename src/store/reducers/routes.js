import { ADDROUTE, REMOVEROUTE,SELECTTAB,SETPARENT } from '../constants'
import { allRoutes } from '@/router/routes'
 
const initState = {
    activeRoute:allRoutes[0],
    parentKey:[],
    data:[allRoutes[0]]
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
            }
            state.parentKey = data.parentKey
            return {...state};
        };
        case REMOVEROUTE:{
            state.data = state.data.filter((item)=>{
                return item.path !== data;
            });
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