import React,{Component} from "react"
import qs from 'querystring'


class About extends Component{
    constructor(props){
        super(props)
        // console.log(props)
        // console.log(props.location.state)
        
    }
    clickRouter = ()=>{
        this.props.history.push("/home",{a:100})
    }
    render(){
        return (
            <div onClick={this.clickRouter}>about</div>
        )
    }
} 

export default About