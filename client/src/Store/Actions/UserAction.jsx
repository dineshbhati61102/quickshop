import  {CREATE_USER, DELETE_USER, GET_USER, UPDATE_USER}from "../Constants"

export function GetUserAction() {
     return{
            type : GET_USER
     }
}

export function CreateUserAction(data) {
     return{
            type : CREATE_USER,
         payload : data
     }
}

export function UpdateUserAction(data) {
     return{
            type : UPDATE_USER,
         payload : data
     }
}

export function DeleteUserAction(data) {
     return{
            type : DELETE_USER,
         payload : data
     }
}