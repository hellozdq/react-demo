import React, {Component,Suspense,lazy} from 'react'
import { connect } from 'react-redux';
import {increment,incrementAsync} from './store/actions/count'
import Person from './pages/Person'
// import AddCount from './pages/test'
import { Link, NavLink,Route } from "react-router-dom";
import { renderRoutes} from 'react-router-config';
import routes from './router';

const AddCount = lazy(()=>import("./pages/AddCount"));


export const {Provider,Consumer} = React.createContext('');
// const Ceshi = () => {
//   
//   const A =() => {
//     const { name } = useContext(AppContext)
class App extends Component{

    increment = ()=> {
        console.log('this.number')
        console.log(this.number.value)
        this.props.increment(Number(this.number.value));
    }
    incrementAsync = ()=> {
        this.props.incrementAsync(Number(this.number.value));
    }
    render(){  
        return (
            <Provider value="100">
                <div>
                    <input ref={(e) => {this.number = e}} type="text" />&nbsp;
                    <button onClick={this.increment}>添加</button>
                    <button onClick={this.incrementAsync}>异步添加</button>
                    <div>{this.props.num}</div>
                    <hr />
                    {/* <Person/>   */}
                    {/* <AddCount /> */}
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={{pathname:"/addcount",state:{id:1}}}>AddCount</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <hr />
                    <Suspense fallback="正在加载中...">
                        {renderRoutes(routes)}
                    </Suspense>
                    {/* <Suspense fallback="正在加载中...">
                        <Route path="/test" component={AddCount} />
                    </Suspense> */}
                    
                    
                </div>
            </Provider>    
                
        )
    }
}

export default connect(
    state=>({
        num:state.count.num
    }),
    {
        increment,
        incrementAsync
    }
)(App);