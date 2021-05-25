import React, { Component } from 'react'
import {connect} from 'react-redux'
import {nanoid} from 'nanoid'
import {addPerson} from '../../store/actions/person'
class Person extends Component {
    add = ()=>{
        const obj = {name:this.name.value, id:nanoid()}
        console.log(obj)
        this.props.addPerson(obj)
    }
    render() {
        return (
            <div>
                {this.props.num}
                <hr />
                <input type="text" ref={(e)=>this.name = e} />
                <button onClick={this.add}>添加</button>
                <div>
                    {
                        this.props.items.map((item)=>{
                            return (
                                <div key={item.id}>{item.name}---{item.id}</div>
                            )
                        })
                    }
                </div>
                <A render={(name)=><B name={name} />}/>    
            </div>
        )
    }
}

class A extends Component{
    state={name:123}
    render(){
        return(
            <div>
                A
                {this.props.render(this.state.name)}
                A
            </div>
        )
    }
}
class B extends Component{
    render(){
        return(
            <div>
                B
                {this.props.name}
            </div>
        )
    }
}

export default connect(
    state=>({
        num:state.count.num,
        items:state.person
    }),
    {
        addPerson
    }
)(Person);
