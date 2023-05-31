import { CREATE_USER_RED, DELETE_USER_RED, GET_USER_RED, UPDATE_USER_RED } from "../Constants"

export const UserReducer = (state = [], action) => {
    var newState;
    switch (action.type) {

        case GET_USER_RED:
            return action.Data

        case CREATE_USER_RED:
            newState = state
            newState.push(action.Data)
            return newState

        case UPDATE_USER_RED:
            newState = state
            var index = newState.findIndex((item) => item._id === action.Data._id)
            newState[index] = action.Data
            return newState

        case DELETE_USER_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default:
            return state
    }
};



