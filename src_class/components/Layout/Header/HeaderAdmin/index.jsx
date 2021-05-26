import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import PubSub from "pubsub-js"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
  } from '@ant-design/icons';
import './index.less'
export default class HeaderAdmin extends Component {
    state = {
        collapsed:false
    }
    toggle = () => {
        this.setState({collapsed:!this.state.collapsed},()=>{
            PubSub.publish("collapsed",this.state.collapsed)
        })
        
    }
    menu = (
        <Menu>
          <Menu.Item>
            <div>修改信息</div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <div>退出登录</div>
          </Menu.Item>
        </Menu>
    );
    render() {
        return (
            <div className="admin">
                <div className="left">
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
                </div>
                <div className="right">
                    <Dropdown overlay={this.menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        admin <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
