import React,{Component} from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu,Layout } from 'antd';
import PubSub from "pubsub-js"
import { routes } from '@/router/routes'
import { connect } from 'react-redux';
import { addRoute, selectTab, setParent} from '@/store/actions/routes';
import './index.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

class Aside extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount(){
    PubSub.subscribe("collapsed",(_,collapsed)=>{
      this.setState({collapsed});
    })

    // 监听路由的变化,如果路由发生变化则进行相应操作
    this.props.history.listen(location => {
        // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
        if (this.props.location.pathname !== location.pathname) {
            // 路由发生了变化
            this.props.selectTab(location.pathname);
        }
    })
  }

  addRoute = (item,path,parentKey)=>{
    return ()=>{
      const obj = {...item};
      obj.path = path;
      obj.parentKey = parentKey;
      this.props.addRoute(obj);
    }
  }

  // 渲染菜单
  renderMenus = (routes, parentPath = "", parentKey = [])=>{
    const menus = routes.map((item)=>{
      if(item.isHide){
        return "";
      }
      if(item.children){
        return (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {this.renderMenus(item.children,parentPath+item.path,[...parentKey,item.key])}
                </SubMenu>
              )
      }else{
        return (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link onClick={this.addRoute(item,parentPath+item.path,parentKey)} to={parentPath+item.path} >{item.title}</Link>  
                </Menu.Item>
              )
      }
    })
    return menus;
  }

  // 改变侧边栏的下拉
  onOpenChange = keys => {
    this.props.setParent(keys);
  }

  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} className="aside">
        <div className="logo">
          <div style={{color:"#fff"}}>{this.props.activePath}</div>
        </div>

        <Menu
          defaultSelectedKeys={[this.props.activeRoute.key]}
          openKeys={this.props.parentKey}
          selectedKeys={[this.props.activeRoute.key]}
          onOpenChange={this.onOpenChange}
          mode="inline"
          theme="dark">
          {
            this.renderMenus(routes)
          }
        </Menu>
      </Sider>
    );
  }
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
)(withRouter(Aside));