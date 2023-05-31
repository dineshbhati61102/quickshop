import { takeEvery, put } from "redux-saga/effects"
import { CreateCheckoutApi, GetCheckoutApi, GetCheckoutUserApi, DeleteCheckoutApi, UpdateCheckoutApi } from "../Service"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, GET_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_USER_RED, DELETE_CHECKOUT_RED, DELETE_CHECKOUT, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED, GET_CHECKOUT_USER } from "../Constants";


function* GetCheckoutSaga() {
          const response = yield GetCheckoutApi()
          yield put({ type: GET_CHECKOUT_RED, Data: response.data });
}

function* GetCheckoutUserSaga(){   //executer
        const response = yield GetCheckoutUserApi()
        yield put({type:GET_CHECKOUT_USER_RED, Data: response.data})
    }

function* CreateCheckoutSaga(action) {
     const response = yield CreateCheckoutApi(action.payload)
          yield put({type: CREATE_CHECKOUT_RED, Data: response.data})
}
 
function* UpdateCheckoutSaga(action) {
            yield UpdateCheckoutApi(action.payload)
             yield put({type: UPDATE_CHECKOUT_RED, Data: action.payload})
   }

function* DeleteCheckoutSaga(action) {
          yield DeleteCheckoutApi(action.payload)
          yield put({type: DELETE_CHECKOUT_RED, Data: action.payload})
}  
      
export function* CheckoutSaga() {
        yield takeEvery(GET_CHECKOUT, GetCheckoutSaga)
        yield takeEvery(GET_CHECKOUT_USER, GetCheckoutUserSaga)
        yield takeEvery(CREATE_CHECKOUT, CreateCheckoutSaga)
        yield takeEvery(UPDATE_CHECKOUT, UpdateCheckoutSaga)
        yield takeEvery(DELETE_CHECKOUT, DeleteCheckoutSaga)
}




