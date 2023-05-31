import { takeEvery, put } from "redux-saga/effects"
import { CreateProductApi, GetProductApi, DeleteProductApi, UpdateProductApi } from "../Service"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, GET_PRODUCT_RED, GET_PRODUCT, DELETE_PRODUCT_RED, DELETE_PRODUCT, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constants";

function* GetProductSaga() {
        const response = yield GetProductApi()
        yield put({ type: GET_PRODUCT_RED, Data: response.data });
}

function* CreateProductSaga(action) {
        const response = yield CreateProductApi(action.payload)
        yield put({ type: CREATE_PRODUCT_RED, Data: response.data });
}

function* UpdateProductSaga(action) {
   var response =  yield UpdateProductApi(action.payload)
        yield put({ type: UPDATE_PRODUCT_RED, Data: action.payload });
}

function* DeleteProductSaga(action) {
        yield DeleteProductApi(action.payload)
        yield put({ type: DELETE_PRODUCT_RED, Data: action.payload });
}


export function* ProductSaga() {
        yield takeEvery(GET_PRODUCT, GetProductSaga)
        yield takeEvery(CREATE_PRODUCT, CreateProductSaga)
        yield takeEvery(UPDATE_PRODUCT, UpdateProductSaga)
        yield takeEvery(DELETE_PRODUCT, DeleteProductSaga)
}
