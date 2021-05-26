import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import "./index.less"

const Layout = (props)=> {
    return (
        <div className="layout">
            <Sidebar/>
            <div className="container">
                <Header/>
                <div className="main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout 
