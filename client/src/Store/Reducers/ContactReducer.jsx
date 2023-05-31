import {GET_CONTACT_RED, UPDATE_CONTACT_RED, CREATE_CONTACT_RED, DELETE_CONTACT_RED} from "../Constants"

export function ContactReducer(state=[], action) {
    var newState;

    switch (action.type) {
        case GET_CONTACT_RED: return action.Data
            
        case CREATE_CONTACT_RED: newState = state
        newState.push(action.Data)
        return newState

        case UPDATE_CONTACT_RED: newState = state
          var index = newState.findIndex((item)=> item._id === action.Data._id)
          newState[index] =  action.Data
          return newState

        case DELETE_CONTACT_RED: 
        newState = state.filter((item)=> item._id !== action.Data._id)
        return newState
    
        default:  return state
    }
}