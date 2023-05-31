import { takeEvery, put } from "redux-saga/effects"
import { CreateWishlistApi, GetWishlistApi, DeleteWishlistApi } from "../Service"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, GET_WISHLIST_RED, GET_WISHLIST, DELETE_WISHLIST_RED, DELETE_WISHLIST, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constants";

function* GetWishlistSaga() {
        const response = yield GetWishlistApi()
        yield put({ type: GET_WISHLIST_RED, Data: response.data});
}

function* CreateWishlistSaga(action) {
        const response = yield CreateWishlistApi(action.payload)
        yield put({ type: CREATE_WISHLIST_RED, Data: response.data });
}

function* DeleteWishlistSaga(action) {
         yield DeleteWishlistApi(action.payload)
        yield put({ type: DELETE_WISHLIST_RED, Data: action.payload });
}

export function* WishlistSaga() {
        yield takeEvery(GET_WISHLIST, GetWishlistSaga)
        yield takeEvery(CREATE_WISHLIST, CreateWishlistSaga)
        yield takeEvery(DELETE_WISHLIST, DeleteWishlistSaga)
}
