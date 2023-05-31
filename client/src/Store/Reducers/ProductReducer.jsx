import { CREATE_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED } from "../Constants"

export const ProductReducer = (state = [], action) => {
    var newState;
    switch (action.type) {

        case GET_PRODUCT_RED:
            return action.Data

        case CREATE_PRODUCT_RED:
            newState = state
            newState.push(action.Data)
            return newState

        case UPDATE_PRODUCT_RED:
            newState = state
            var index = newState.findIndex((item) => item._id === action.Data._id)
            newState[index] = action.Data
            return newState

        case DELETE_PRODUCT_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default:
            return state
    }
};



