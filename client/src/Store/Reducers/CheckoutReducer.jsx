import {GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED, CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_USER_RED} from "../Constants"

export function CheckoutReducer(state=[], action) {
    var newState;

    switch (action.type) {
        case GET_CHECKOUT_RED: 
        return action.Data
            
        case GET_CHECKOUT_USER_RED: 
        return action.Data

        case CREATE_CHECKOUT_RED: newState = state
        newState.push(action.Data)
        return newState

        case UPDATE_CHECKOUT_RED: newState = state
          var index = newState.findIndex((item)=> item._id === action.Data._id)
          newState[index] =  action.Data
          return newState

        case DELETE_CHECKOUT_RED: 
        newState = state.filter((item)=> item._id !== action.Data._id)
        return newState
    
        default:  return state
    }
}