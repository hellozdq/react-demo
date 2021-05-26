import React,{Component} from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { removeRoute, selectTab} from '@/store/actions/routes';
import './index.less'

const { TabPane } = Tabs;


const HeaderTab = (props)=> {
  const onChange = activeKey => {
    props.history.push(activeKey);
  };
  
  //修改的时候
  const onEdit = (targetKey, action) => {
    console.log(action)
    eval(action)(targetKey);
  };

  // 删除tab 删除后定位到前一个
  const remove = targetKey => {
    let index = props.routes.findIndex((item)=>{
      return item.path === targetKey;
    });
    if(index!=0){
      index--;
    }
    props.history.push(props.routes[index].path);

    props.removeRoute(targetKey); 
  };

  return (
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
  );
}
  
export default connect(
    state=>({
        routes:state.routes.data,
        activeRoute:state.routes.activeRoute
    }),
    {
        removeRoute,
        selectTab
    }
)(withRouter(HeaderTab));