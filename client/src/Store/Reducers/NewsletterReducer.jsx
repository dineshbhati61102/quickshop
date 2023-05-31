import { CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER_RED, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER_RED } from "../Constants"

export const NewsletterReducer = (state = [], action) => {
    var newState;
    switch (action.type) {

        case GET_NEWSLETTER_RED:
            return action.Data

        case CREATE_NEWSLETTER_RED:
            newState = state
            newState.push(action.Data)
            return newState


        case DELETE_NEWSLETTER_RED:
            newState = state.filter((item) => item._id !== action.Data._id)
            return newState

        default:
            return state
    }
};



