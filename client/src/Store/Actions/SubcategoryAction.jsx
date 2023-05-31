import {GET_SUBCATEGORY, CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY, DELETE_SUBCATEGORY} from "../Constants"


export function GetSubcategoryAction(){
    return{
        type:GET_SUBCATEGORY
    }
}
export function CreateSubcategoryAction(data) {
    return{
        type: CREATE_SUBCATEGORY,
        payload : data
    }
}


export function UpdateSubcategoryAction(data) {
    return{
        type: UPDATE_SUBCATEGORY,
        payload : data
    }
}


export function DeleteSubcategoryAction(data) {
    return{
        type: DELETE_SUBCATEGORY,
        payload : data
    }
}