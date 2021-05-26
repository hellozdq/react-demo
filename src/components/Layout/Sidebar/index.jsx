import React,{useState,useEffect} from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu,Layout } from 'antd';
import PubSub from "pubsub-js"
import { routes } from '@/router/routes'
import { connect } from 'react-redux';
import { addRoute, selectTab, setParent} from '@/store/actions/routes';
import './index.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = (props)=>{
  const [collapsed,setCollapsed] = useState(false);

  // 初始化渲染完成订阅是否展开
  useEffect(()=>{
    PubSub.subscribe("collapsed",(_,collapsed)=>{
      setCollapsed(collapsed);
    })
  },[])

  //监听路由变化(路由变化就修改选中的路由)
  useEffect(()=>{
    props.selectTab(location.pathname);
  },[props.location.pathname])

  // 添加路由
  const addRoute = (item,path,parentKey)=>{
    return ()=>{
      const obj = {...item};
      obj.path = path;
      obj.parentKey = parentKey;
      props.addRoute(obj);
    }
  }

  // 渲染菜单
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

  // 改变侧边栏的下拉
  const onOpenChange = keys => {
    props.setParent(keys);
  }

  return (
    <Sider collapsible collapsed={collapsed} className="aside">
      <div className="logo">
        <div style={{color:"#fff"}}>{props.activePath}</div>
      </div>

      <Menu
        defaultSelectedKeys={[props.activeRoute.key]}
        openKeys={props.parentKey}
        selectedKeys={[props.activeRoute.key]}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="dark">
        {
          renderMenus(routes)
        }
      </Menu>
    </Sider>
  );
}

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