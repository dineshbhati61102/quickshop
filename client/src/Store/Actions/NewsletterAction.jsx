import {GET_NEWSLETTER, CREATE_NEWSLETTER, UPDATE_NEWSLETTER, DELETE_NEWSLETTER} from "../Constants"


export function GetNewsletterAction(){
    return{
        type:GET_NEWSLETTER
    }
}
export function CreateNewsletterAction(data) {
    return{
        type: CREATE_NEWSLETTER,
        payload : data
    }
}


export function UpdateNewsletterAction(data) {
    return{
        type: UPDATE_NEWSLETTER,
        payload : data
    }
}


export function DeleteNewsletterAction(data) {
    return{
        type: DELETE_NEWSLETTER,
        payload : data
    }
}