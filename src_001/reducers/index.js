import { INCREMENT } from '../constants'
const initialState = {number:0}
const incrementReducer = (state = initialState, action) => {
    console.log("------------------>0")
    const {type,data} = action;
    switch(type) {
        case INCREMENT: {
            console.log("------------------>1")
            state.number += data
            return { ...state }
        };
        default: return state;
    }
};
export default incrementReducer;