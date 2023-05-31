import {GET_CART, CREATE_CART, UPDATE_CART, DELETE_CART} from "../Constants"


export function GetCartAction(){
    return{
        type:GET_CART
    }
}
export function CreateCartAction(data) {
    return{
        type: CREATE_CART,
        payload : data
    }
}


export function UpdateCartAction(data) {
    return{
        type: UPDATE_CART,
        payload : data
    }
}


export function DeleteCartAction(data) {
    return{
        type: DELETE_CART,
        payload : data
    }
}