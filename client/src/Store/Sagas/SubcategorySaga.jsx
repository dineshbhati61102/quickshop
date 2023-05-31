import { takeEvery, put } from "redux-saga/effects"
import { CreateSubcategoryApi, GetSubcategoryApi, DeleteSubcategoryApi, UpdateSubcategoryApi } from "../Service"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, GET_SUBCATEGORY, DELETE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants";

function* GetSubcategorySaga() {
        const response = yield GetSubcategoryApi()
        yield put({ type: GET_SUBCATEGORY_RED, Data: response.data});
}

function* CreateSubcategorySaga(action) {
        const response = yield CreateSubcategoryApi(action.payload)
        yield put({ type: CREATE_SUBCATEGORY_RED, Data: response.data });
}

function* UpdateSubcategorySaga(action) {
          yield UpdateSubcategoryApi(action.payload)
        yield put({ type: UPDATE_SUBCATEGORY_RED, Data: action.payload });
}

function* DeleteSubcategorySaga(action) {
         yield DeleteSubcategoryApi(action.payload)
        yield put({ type: DELETE_SUBCATEGORY_RED, Data: action.payload });
}

export function* SubcategorySaga() {
        yield takeEvery(GET_SUBCATEGORY, GetSubcategorySaga)
        yield takeEvery(CREATE_SUBCATEGORY, CreateSubcategorySaga)
        yield takeEvery(UPDATE_SUBCATEGORY, UpdateSubcategorySaga)
        yield takeEvery(DELETE_SUBCATEGORY, DeleteSubcategorySaga)
}
