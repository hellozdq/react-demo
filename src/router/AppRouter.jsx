import React from 'react'
import {Route} from 'react-router-dom'
import {allRoutes} from './routes'

const AppRouter = ()=> {
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
export default AppRouter