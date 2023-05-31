import {GET_BRAND, CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND} from "../Constants"


export function GetBrandAction(){
    return{
        type:GET_BRAND
    }
}
export function CreateBrandAction(data) {
    return{
        type: CREATE_BRAND,
        payload : data
    }
}


export function UpdateBrandAction(data) {
    return{
        type: UPDATE_BRAND,
        payload : data
    }
}


export function DeleteBrandAction(data) {
    return{
        type: DELETE_BRAND,
        payload : data
    }
}