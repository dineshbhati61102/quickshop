import { CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED } from "../Constants"

export const MaincategoryReducer = (state = [], action) => {
    var newState;
    switch (action.type) {

        case GET_MAINCATEGORY_RED:
            return action.Data

        case CREATE_MAINCATEGORY_RED:
            newState = state
            newState.push(action.Data)
            return newState

        case UPDATE_MAINCATEGORY_RED:
            newState = state
            var index = newState.findIndex((item) => item._id === action.Data._id)
            newState[index] = action.Data
            return newState

        case DELETE_MAINCATEGORY_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default:
            return state
    }
};



