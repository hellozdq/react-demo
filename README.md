## react 简易的后台页面基础架构

### 类似 vue-element-admin 的后台管理模板，包含侧边栏、头部导航标签和需要导航跳转的主要页面

![avatar](/src/images/page.jpg)

### 拉取使用

1. git clone https://github.com/hellozdq/react-demo.git 拉取项目
2. yarn 安装依赖
3. yarn run dev 运行

### 结构

- src 函数式写法
  - common 公共函数
  - components 公共组件
    - Layout 布局
  - pages 页面
  - router 路由
  - store redux
  - APP.jsx 主要组件
- src_001 测试
- src_002 测试
- src_class class 写法

### webpack + react + redux + router + antd + less

```
npm i react react-dom -S  //安装react
npm i react-router-dom -D //安装router
npm i redux react-redux -D //安装redux
npm i css-loader style-loader less -D 安装less
npm i antd -S //安装 antd组件库
npm i pubsub-js -S //用于订阅和发布传参
npm i react-thunk -S  //用于redux 的异步操作
```

## 记录
### class函数的三种写法
```
import React,{Component} from "react"

class Home extends Component{
    constructor(props){
        super(props)
        this.name = 1;
        this.fun2 = this.fun2.bind(this)/* 2 */
    }

    /* 1 */
    fun = () => {
        console.log(this.name)
        console.log("-----------------1")
    }
    /* 2 */
    fun2(){
        console.log(this.name)
        console.log("-----------------2")
    }
     /* 3 */
     fun3(){
        console.log(this.name)
        console.log("-----------------3")
    }

    render(){
        return (
            <div>
                <button onClick={this.fun}>btn1</button>{/* 1 */}
                <button onClick={this.fun2}>btn2</button>{/* 2 */}
                <button onClick={()=>this.fun3()}>btn3</button>{/* 3 */}
            </div>
        )
    }
} 
```

### 获取ref 的4种方法
```
import React,{Component} from "react"

class Home extends Component{
    constructor(props){
        super(props)
        this.refName = React.createRef();//1
        this.refName2 = null;//2
        this.refName3 = null;//3
    }

    getRef = (e) => {
        this.refName3 = e
    }
    
    componentDidMount(){
        console.log(this.refName.current) //1
        console.log(this.refName2)//2
        console.log(this.refName3)//3
        console.log(this.refs.refName) //4 已废弃
    }

    render(){
        return (
            <div>
                <div ref={this.refName}>home</div>{/* 1 */}
                <div ref={(e)=>this.refName2=e}>home2</div>{/* 2 */}
                <div ref={this.getRef}>home3</div>{/* 3 */}
                <div ref="refName">home4</div>{/* 4*/}
            </div>
        )
    }
} 
```


### 处理路由
```
<!-- router/routes/index.js -->
/* path: 路径  component： 组件 title:标题  exact: 是否精准匹配 children 子路由  icon: 图标  key：唯一标识*/
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

<!-- components/layout/Sidebar/index.jsx -->
<!-- 侧边栏使用  递归调用 扁平化 拼接父级和子级path-->
const renderMenus = (routes, parentPath = "", parentKey = [])=>{
    const menus = routes.map((item)=>{
      if(item.isHide){
        return "";
      }
      if(item.children){
        return (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {renderMenus(item.children,parentPath+item.path,[...parentKey,item.key])}
                </SubMenu>
              )
      }else{
        return (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link onClick={addRoute(item,parentPath+item.path,parentKey)} to={parentPath+item.path} >{item.title}</Link>  
                </Menu.Item>
              )
      }
    })
    return menus;
  }

<!-- components/layout/Header/HeaderTab/index.jsx -->
<!-- 
    头部导航不需要 扁平化处理 
    获取的渲染tab的数据是扁平化后的数据
-->
  <div className="tab">
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={props.activeRoute.path}
        type="editable-card"
        onEdit={onEdit}
      >
        {props.routes.map(item => (
          <TabPane tab={item.title} key={item.path} tabBarGutter={0} closable={props.routes.length!==1}/>
        ))}
      </Tabs>
    </div>

```


### redux
```
<!-- store/constants.js  -->
<!-- 设置公共静态变量 -->
export const ADDROUTE = 'addRoute'
export const REMOVEROUTE = 'removeRoute'
export const SELECTTAB = 'selectTab'
export const SETPARENT = 'setParent'

<!-- store/actions/routes -->
<!-- 页面调用的方法 -->
import {ADDROUTE,REMOVEROUTE,SELECTTAB,SETPARENT} from '../constants'
// 添加路由
export const addRoute = data => ({type:ADDROUTE,data});
// 删除路由
export const removeRoute = data => ({type:REMOVEROUTE,data});
// 选择Tab
export const selectTab = data => ({type:SELECTTAB,data});
// 选中设置路由的父节点
export const setParent = data => ({type:SETPARENT,data});

<!-- store/reduces/index -->
<!-- 处理合并所有redux -->
import { combineReducers } from 'redux'
import routes from './routes'
import home from './home'
...
<!-- 合并 所有的reducers的方法 -->
export default combineReducers({routes,home});


<!-- store/reduces/routes -->
<!-- 调用redux routes方法 触发时触发的方法 -->
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

<!-- store/index.js -->
<!-- 将数据传到store,导出使用 -->
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

<!-- 中间件applyMiddleWare 实现异步的action -->
const store = createStore(reducers,applyMiddleware(thunk));

export default store;

<!-- components/Layout/Sidebar.index.jsx -->
<!-- 页面使用redux,使用connect 把redux 挂载到props 上  -->
import { connect } from 'react-redux';
const SideBar = (props)=>{
    console.log(props.routes)
    ...
})
export default connect(
  state=>({
      routes:state.routes.data,
      activeRoute:state.routes.activeRoute,
      parentKey:state.routes.parentKey
  }),
  {
      addRoute,
      selectTab,
      setParent
  }
)(withRouter(SideBar));

```
