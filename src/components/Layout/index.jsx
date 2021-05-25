import React, { Component } from 'react'
import Header from './Header'
import Aside from './Aside'
import "./index.less"

export default class index extends Component {
    render() {
        return (
            <div className="layout">
                <Aside/>
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
