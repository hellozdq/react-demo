import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import "./index.less"

export default class index extends Component {
    render() {
        return (
            <div className="layout">
                <Sidebar/>
                <div className="container">
                    <Header/>
                    <div className="main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
