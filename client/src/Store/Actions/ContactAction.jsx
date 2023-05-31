import {GET_CONTACT, CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT} from "../Constants"


export function GetContactAction(){
    return{
        type:GET_CONTACT
    }
}
export function CreateContactAction(data) {
    return{
        type: CREATE_CONTACT,
        payload : data
    }
}


export function UpdateContactAction(data) {
    return{
        type: UPDATE_CONTACT,
        payload : data
    }
}


export function DeleteContactAction(data) {
    return{
        type: DELETE_CONTACT,
        payload : data
    }
}