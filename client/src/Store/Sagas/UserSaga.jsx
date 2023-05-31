import { takeEvery, put } from "redux-saga/effects"
import { CreateUserApi, GetUserApi, DeleteUserApi, UpdateUserApi } from "../Service"
import { CREATE_USER, CREATE_USER_RED, GET_USER_RED, GET_USER, DELETE_USER_RED, DELETE_USER, UPDATE_USER_RED, UPDATE_USER } from "../Constants";

function* GetUserSaga() {
        const response = yield GetUserApi()
        yield put({ type: GET_USER_RED, Data: response.data });
}

function* CreateUserSaga(action) {
        const response = yield CreateUserApi(action.payload)
        yield put({ type: CREATE_USER_RED, Data: response.data });
}

function* UpdateUserSaga(action) {
        yield UpdateUserApi(action.payload)
        yield put({ type: UPDATE_USER_RED, Data: action.payload });
}

function* DeleteUserSaga(action) {
        yield DeleteUserApi(action.payload)
        yield put({ type: DELETE_USER_RED, Data: action.payload });
}




export function* UserSaga() {
        yield takeEvery(GET_USER, GetUserSaga)
        yield takeEvery(CREATE_USER, CreateUserSaga)
        yield takeEvery(UPDATE_USER, UpdateUserSaga)
        yield takeEvery(DELETE_USER, DeleteUserSaga)
}
