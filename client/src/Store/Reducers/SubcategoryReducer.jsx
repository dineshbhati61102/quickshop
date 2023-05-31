import { CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from '../Constants';

export function SubcategoryReducer(state = [], action) {
    var newState;
    switch (action.type) {
        case GET_SUBCATEGORY_RED:
            return action.Data

        case CREATE_SUBCATEGORY_RED: newState = state
            newState.push(action.Data)
            return newState

        case UPDATE_SUBCATEGORY_RED: newState = state
            var index = newState.findIndex((index) => index._id === action.Data._id)
            newState[index] = action.Data
            return newState

        case DELETE_SUBCATEGORY_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default: return state
    }

};


