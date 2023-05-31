import {GET_MAINCATEGORY, CREATE_MAINCATEGORY, UPDATE_MAINCATEGORY, DELETE_MAINCATEGORY} from "../Constants"


export function GetMaincategoryAction(){
    return{
        type:GET_MAINCATEGORY
    }
}
export function CreateMaincategoryAction(data) {
    return{
        type: CREATE_MAINCATEGORY,
        payload : data
    }
}


export function UpdateMaincategoryAction(data) {
    return{
        type: UPDATE_MAINCATEGORY,
        payload : data
    }
}


export function DeleteMaincategoryAction(data) {
    return{
        type: DELETE_MAINCATEGORY,
        payload : data
    }
}