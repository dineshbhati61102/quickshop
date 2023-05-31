import { CREATE_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constants"
export function CartReducer(state = [], action) {
    var newState
    switch (action.type) {
        case GET_CART_RED:
            return action.Data

        case CREATE_CART_RED:
            newState = state
            newState.push(action.Data)
            return newState

        case UPDATE_CART_RED:
            newState = state
            var index = newState.findIndex((item) => item._id === action.Data._id)
            newState[index] = action.Data
            return newState

        case DELETE_CART_RED:
            newState = state.filter(item => item._id !== action.Data._id)
            return newState
        default:
            return state
    }
}