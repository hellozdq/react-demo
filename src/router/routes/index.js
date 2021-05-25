import React, {lazy} from 'react'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';

const Home = lazy(()=>import("../../pages/Home"));
const About = lazy(()=>import("../../pages/About"));
const AboutDetail = lazy(()=>import("../../pages/About/AboutDetail"));
const Error = ()=><h1>404</h1>

/* path: 路径  component： 组件  exact: 是否精准匹配 children 子路由 */
const routes = [
   {
        path:"/",
        component:Home,
        title:"Home",
        exact:true,
        icon:<AppstoreOutlined/>,
        key:'1'
    },
    {
        path:"/about",
        title:"About",
        icon:<AppstoreOutlined/>,
        key:'2',
        children: [
            {
                path:"/",
                component: About,
                title:"Abouts",
                exact:true,
                icon:<AppstoreOutlined/>,
                key:'2-1'
            },
            {
                path:"/detail",
                title:"AboutDetail",
                component: AboutDetail,
                icon:<AppstoreOutlined/>,
                key:'2-2'
            }
        ]
    },
    {
        path:"/404",
        component:Error,
        title:"404",
        icon:<MenuUnfoldOutlined/>,
        isHide:true,
        key:'3'
    }
]


// 把多级路由展开成一级路由
/* routes: 路由 parentPath：拼接路径 parentKey：父级的key */
function flatRoutes(routes,parentPath = "", parentKey = []){
    let arr = [];
    for(let i = 0; i < routes.length; i++){
        if(!routes[i].children){
            const obj = {...routes[i]};
            obj.parentKey = parentKey;
            if(parentPath){
                obj.path = parentPath + obj.path;
            }
            arr.push(obj);
        }else{
            const results = flatRoutes(routes[i].children,parentPath + routes[i].path,[...parentKey,routes[i].key]);
            arr = [...arr,...results];
        }
    }
    return arr;
}

const allRoutes = flatRoutes(routes);
export {routes,allRoutes};