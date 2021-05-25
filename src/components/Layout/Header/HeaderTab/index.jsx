import React,{Component} from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { removeRoute, selectTab} from '@/store/actions/routes';
import './index.less'

const { TabPane } = Tabs;

class HeaderTab extends Component {
    // tab 改变的时候
    onChange = activeKey => {
      this.props.history.push(activeKey);
    };
    
    //修改的时候
    onEdit = (targetKey, action) => {
      this[action](targetKey);
    };
  
    // 删除tab 删除后定位到前一个
    remove = targetKey => {
      let index = this.props.routes.findIndex((item)=>{
        return item.path === targetKey;
      });
      if(index!=0){
        index--;
      }
      this.props.history.push(this.props.routes[index].path);

      this.props.removeRoute(targetKey); 
    };
    
    render() {
      return (
        <div className="tab">
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.props.activeRoute.path}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.props.routes.map(item => (
              <TabPane tab={item.title} key={item.path} tabBarGutter={0} closable={this.props.routes.length!==1}/>
            ))}
          </Tabs>
        </div>
      );
    }
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