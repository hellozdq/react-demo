import {INCREMENT} from '../constants'

const initState = {num:0}
const count = (state = initState, action)=>{
    const {type,data} = action
    switch(type) {
        case INCREMENT:{
            state.num += data;
            return {...state};
        };
        default: return state;
    }
}
export default count