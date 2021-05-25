import React from 'react';
import { connect } from 'react-redux';
import { increment,incrementAsync } from '../../actions/index';
import { Link, NavLink,Route } from "react-router-dom";
import { DatePicker } from 'antd';
import PubSub from "pubsub-js"
import About from './About'
import './index.css'
import 'antd/dist/antd.less';

class App extends React.Component {
    constructor(props,context){
        super(props)
        // console.log(context)
        // console.log(props.location.state)
    }
    componentDidMount(){
        // console.log("mount")
        // console.log(this.props.number)
        PubSub.subscribe("test",(msg,data)=>{
            console.log(msg)
            console.log(data)
        });
    }
    componentDidUpdate(){
        // console.log("update")
        // console.log(this.props.number)
    }
    state = {name:123};
    a = 1;
    onClick = ()=>{
        // PubSub.publish("test","123");
        // this.props.history.history.go(1)
        // this.props.history.history.push()
        // this.props.history.history.replace()
        // console.log(this.props.location.state)
        // console.log(this)
        const { value } = this.r
        console.log('value')
        console.log(value)
        // console.log("-------------------1")
        this.props.incrementAsync(Number(value));
        console.log(this.props);
        console.log(this.props.number);
        // console.log(store.getState());
        console.log()
        
    }

    clickRef = (c)=>{
        this.r = c;
    }

    changName = (e) => {
        this.setState({"name":e.target.value})
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT' })
    }

    render() {
        return (
            <div>
                <div>react-router 测试</div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={{pathname:"/home/about",state:{id:1}}}>about</NavLink>
                        </li>
                        <li>
                            <Link to="/users">users</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/home/about" component={About} />
                <About/>

                <input onInput={this.changName} type="number" min="0" ref={this.clickRef}></input>
                <div>{this.state.name}</div>

                <br/>
                <div>redux & redux-saga测试</div>
                <div>current number： {this.props.number} <button onClick={this.onClick}>点击</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击+1</button></div>
                <DatePicker />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: (...args) => dispatch(increment(...args)),
        incrementAsync: (...args) => dispatch(incrementAsync(...args))
    }
};

export default connect(
    state => ({
        number: state.number
    }),
    {
        increment,
        incrementAsync
    }
)(App);