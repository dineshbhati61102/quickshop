import {GET_BRAND_RED, UPDATE_BRAND_RED, CREATE_BRAND_RED, DELETE_BRAND_RED} from "../Constants"

export function BrandReducer(state=[], action) {
    var newState;

    switch (action.type) {
        case GET_BRAND_RED: return action.Data
            
        case CREATE_BRAND_RED: newState = state
        newState.push(action.Data)
        return newState

        case UPDATE_BRAND_RED: newState = state
          var index = newState.findIndex((item)=> item._id === action.Data._id)
          newState[index] =  action.Data
          return newState

        case DELETE_BRAND_RED: 
        newState = state.filter((item)=> item._id !== action.Data._id)
        return newState
    
        default:  return state
    }
}