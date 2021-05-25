import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { Consumer } from "../../App";//引入父组件的Consumer容器
const AddCount = (props,context) => {
  const [ count, setCount ] = useState(0)
  const addcount = () => {
    let newCount = count
    setCount(newCount+=1)
  } 

  useEffect((v) => {
    console.log(v)
    console.log("------------useEffect->>")
  },[count]);

  useEffect((v) => {
    console.log(v)
    console.log("------------useEffect->>2")
  }, [props.num]);

  return (
    <>
      <div>{props.num}</div>
      <p>{count}</p>
      <button onClick={addcount}>count++</button>
      <Consumer>
          {( name ) =>
              <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                  <p>子组件。获取父组件的值:{name}</p>
              </div>
          }
      </Consumer>
    </>
  )
}

export default connect(
    state => ({num:state.count.num})
)(AddCount)