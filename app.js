import App from './src/App';
import ReactDom from 'react-dom';
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'
import store from './src/store'


ReactDom.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ConfigProvider>
, document.getElementById('root'));