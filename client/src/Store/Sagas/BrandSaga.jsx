import { takeEvery, put } from "redux-saga/effects"
import { CreateBrandApi, GetBrandApi, DeleteBrandApi, UpdateBrandApi } from "../Service"
import { CREATE_BRAND, CREATE_BRAND_RED, GET_BRAND_RED, GET_BRAND, DELETE_BRAND_RED, DELETE_BRAND, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants";

function* GetBrandSaga() {
        const response = yield GetBrandApi()
        yield put({ type: GET_BRAND_RED, Data: response.data });
}

function* CreateBrandSaga(action) {
        const response = yield CreateBrandApi(action.payload)
        yield put({ type: CREATE_BRAND_RED, Data: response.data });
}

function* UpdateBrandSaga(action) {
        yield UpdateBrandApi(action.payload)
        yield put({ type: UPDATE_BRAND_RED, Data: action.payload });
}

function* DeleteBrandSaga(action) {
        yield DeleteBrandApi(action.payload)
         yield put({ type: DELETE_BRAND_RED, Data: action.payload });
 }


export function* BrandSaga() {
        yield takeEvery(GET_BRAND, GetBrandSaga)
        yield takeEvery(CREATE_BRAND, CreateBrandSaga)
        yield takeEvery(UPDATE_BRAND, UpdateBrandSaga)
        yield takeEvery(DELETE_BRAND, DeleteBrandSaga)
}
