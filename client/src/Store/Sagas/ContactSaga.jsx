import {takeEvery,put } from "redux-saga/effects"
import { GetContactApi, CreateContactApi, UpdateContactApi, DeleteContactApi } from "../Service"
import {GET_CONTACT_RED, GET_CONTACT, CREATE_CONTACT_RED, CREATE_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_RED, DELETE_CONTACT, DELETE_CONTACT_RED, } from "../Constants"


function* GetContactSaga() {
    const response = yield GetContactApi()
    yield put({type:GET_CONTACT_RED, Data: response.data})   
}

function* CreateContactSaga(action) {
    const response = yield CreateContactApi(action.payload)
    yield put({type:CREATE_CONTACT_RED, Data: response.data})   
}

function* UpdateContactSaga(action) {
    yield UpdateContactApi(action.payload)
    yield put({type:UPDATE_CONTACT_RED, Data: action.payload})   
}

function* DeleteContactSaga(action) {
    yield DeleteContactApi(action.payload)
    yield put({type:DELETE_CONTACT_RED, Data: action.payload})   
}

export function* ContactSaga() {
    yield takeEvery(GET_CONTACT, GetContactSaga)
    yield takeEvery(CREATE_CONTACT, CreateContactSaga)
    yield takeEvery(UPDATE_CONTACT, UpdateContactSaga)
    yield takeEvery(DELETE_CONTACT, DeleteContactSaga)
}