import {ADDPERSON} from '../constants'

const initState = []
const person = (state = initState, action)=>{
    const {type,data} = action
    switch(type) {
        case ADDPERSON:{
            state = [data,...state];
            return [...state];
        };
        default: {
            console.log("=================>>")
            return state
        };
    }
}
export default person