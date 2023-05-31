import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED, UPDATE_WISHLIST_RED } from '../Constants';

export function WishlistReducer(state = [], action) {
    var newState;
    switch (action.type) {
        case GET_WISHLIST_RED:
            return action.Data

        case CREATE_WISHLIST_RED: newState = state
            newState.push(action.Data)
            return newState

        case DELETE_WISHLIST_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default: return state
    }

};


