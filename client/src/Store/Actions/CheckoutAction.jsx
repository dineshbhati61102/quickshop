import {GET_CHECKOUT, GET_CHECKOUT_USER, CREATE_CHECKOUT, UPDATE_CHECKOUT, DELETE_CHECKOUT} from "../Constants"


export function GetCheckoutAction(){
    return{
        type:GET_CHECKOUT
    }
}
export function CreateCheckoutAction(data) {
    return{
        type: CREATE_CHECKOUT,
        payload : data
    }
}

export function GetCheckoutUserAction(){
    return{
        type:GET_CHECKOUT_USER
    }
}

export function UpdateCheckoutAction(data) {
    return{
        type: UPDATE_CHECKOUT,
        payload : data
    }
}


export function DeleteCheckoutAction(data) {
    return{
        type: DELETE_CHECKOUT,
        payload : data
    }
}