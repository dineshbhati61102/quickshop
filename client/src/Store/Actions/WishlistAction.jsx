import {GET_WISHLIST, CREATE_WISHLIST, UPDATE_WISHLIST, DELETE_WISHLIST} from "../Constants"


export function GetWishlistAction(){
    return{
        type:GET_WISHLIST
    }
}
export function CreateWishlistAction(data) {
    return{
        type: CREATE_WISHLIST,
        payload : data
    }
}


export function UpdateWishlistAction(data) {
    return{
        type: UPDATE_WISHLIST,
        payload : data
    }
}


export function DeleteWishlistAction(data) {
    return{
        type: DELETE_WISHLIST,
        payload : data
    }
}