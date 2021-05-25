import { INCREMENT } from '../constants'
export const increment = data => ({type: INCREMENT,data:data})
export const incrementAsync = data => {
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(increment(data))
    },1000)
  }
}