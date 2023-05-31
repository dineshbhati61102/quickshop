import { takeEvery, put } from "redux-saga/effects"
import { CreateNewsletterApi, GetNewsletterApi, DeleteNewsletterApi } from "../Service"
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, GET_NEWSLETTER_RED, GET_NEWSLETTER, DELETE_NEWSLETTER_RED, DELETE_NEWSLETTER, UPDATE_NEWSLETTER_RED, UPDATE_NEWSLETTER } from "../Constants";

function* GetNewsletterSaga() {
        const response = yield GetNewsletterApi()
        yield put({ type: GET_NEWSLETTER_RED, Data: response.data });
}

function* CreateNewsletterSaga(action) {
        const response = yield CreateNewsletterApi(action.payload)
        yield put({ type: CREATE_NEWSLETTER_RED, Data: response.data });
}



function* DeleteNewsletterSaga(action) {
         yield DeleteNewsletterApi(action.payload)
        yield put({ type: DELETE_NEWSLETTER_RED, Data: action.payload });
}


export function* NewsletterSaga() {
        yield takeEvery(GET_NEWSLETTER, GetNewsletterSaga)
        yield takeEvery(CREATE_NEWSLETTER, CreateNewsletterSaga)
        yield takeEvery(DELETE_NEWSLETTER, DeleteNewsletterSaga)
}
