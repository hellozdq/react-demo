import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {allRoutes} from './routes'

export default class AppRouter extends Component {
    render() {
        return (
            <>
                {
                    allRoutes.map((item,index)=>{
                        return <Route path={item.path} component={item.component} exact={item.exact||false} key={index}/>
                    })
                }
            </>
        )
    }
}
