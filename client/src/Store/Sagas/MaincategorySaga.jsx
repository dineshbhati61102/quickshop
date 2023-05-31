import { takeEvery, put } from "redux-saga/effects"
import { CreateMaincategoryApi, GetMaincategoryApi, DeleteMaincategoryApi, UpdateMaincategoryApi } from "../Service"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, GET_MAINCATEGORY, DELETE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants";


function* GetMaincategorySaga() {
          const response = yield GetMaincategoryApi()
          yield put({ type: GET_MAINCATEGORY_RED, Data: response.data });
}

function* CreateMaincategorySaga(action) {
     const response = yield CreateMaincategoryApi(action.payload)
          yield put({type: CREATE_MAINCATEGORY_RED, Data: response.data})
}
 
function* UpdateMaincategorySaga(action) {
            yield UpdateMaincategoryApi(action.payload)
             yield put({type: UPDATE_MAINCATEGORY_RED, Data: action.payload})
   }

function* DeleteMaincategorySaga(action) {
          yield DeleteMaincategoryApi(action.payload)
          yield put({type: DELETE_MAINCATEGORY_RED, Data: action.payload})
}  
      
export function* MaincategorySaga() {
        yield takeEvery(GET_MAINCATEGORY, GetMaincategorySaga)
        yield takeEvery(CREATE_MAINCATEGORY, CreateMaincategorySaga)
        yield takeEvery(UPDATE_MAINCATEGORY, UpdateMaincategorySaga)
        yield takeEvery(DELETE_MAINCATEGORY, DeleteMaincategorySaga)
}




