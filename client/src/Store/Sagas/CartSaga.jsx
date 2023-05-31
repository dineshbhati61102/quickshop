import {takeEvery,put } from "redux-saga/effects"
import { GetCartApi, CreateCartApi, UpdateCartApi, DeleteCartApi } from "../Service"
import {GET_CART_RED, GET_CART, CREATE_CART_RED, CREATE_CART, UPDATE_CART, UPDATE_CART_RED, DELETE_CART, DELETE_CART_RED, } from "../Constants"


function* GetCartSaga() {
    const response = yield GetCartApi()
    yield put({type:GET_CART_RED, Data: response.data})   
}

function* CreateCartSaga(action) {
    const response = yield CreateCartApi(action.payload)
    yield put({type:CREATE_CART_RED, Data: response.data})   
}

function* UpdateCartSaga(action) {
    yield UpdateCartApi(action.payload)
    yield put({type:UPDATE_CART_RED, Data: action.payload})   
}

function* DeleteCartSaga(action) {
    yield DeleteCartApi(action.payload)
    yield put({type:DELETE_CART_RED, Data: action.payload})   
}

export function* CartSaga() {
    yield takeEvery(GET_CART, GetCartSaga)
    yield takeEvery(CREATE_CART, CreateCartSaga)
    yield takeEvery(UPDATE_CART, UpdateCartSaga)
    yield takeEvery(DELETE_CART, DeleteCartSaga)
}