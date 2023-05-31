import {GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from "../Constants"


export function GetProductAction(){
    return{
        type:GET_PRODUCT
    }
}
export function CreateProductAction(data) {
    return{
        type: CREATE_PRODUCT,
        payload : data
    }
}


export function UpdateProductAction(data) {
    return{
        type: UPDATE_PRODUCT,
        payload : data
    }
}


export function DeleteProductAction(data) {
    return{
        type: DELETE_PRODUCT,
        payload : data
    }
}