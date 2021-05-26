import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import PubSub from "pubsub-js"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
  } from '@ant-design/icons';
import './index.less'

const HeaderAdmin = ()=>{
    const [collapsed,setCollapsed] = useState(false);

    // 切换收起和展开侧边栏
    const toggle = () => {
        setCollapsed((c)=>{
            c = !c;
            PubSub.publish("collapsed",c);
            return c;
        });
    }
    // 右侧下拉菜单
    const menu = (
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
    return (
        <div className="admin">
            <div className="left">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
            })}
            </div>
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    admin <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}

export default HeaderAdmin