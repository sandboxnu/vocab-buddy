import { takeLatest, put, all, call } from "redux-saga/effects";
import { types, singleRequest } from "./actions";
import FirebaseInteractor from "../firebase/firebaseInteractor";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(types.REQUEST, watchSingleRequest);
  yield takeLatest(types.ADDUSER, watchAddUser);
}

function* watchSingleRequest() {
  try {
    // replace the following url with the URL above
    yield put(singleRequest.success());
  } catch (e) {
    yield put(singleRequest.error());
    console.log(e);
  }
}

function* watchAddUser(action) {
  let { name } = action.payload;
  try {
    let id;
    const updateWithSuccess = async () => {
      id = await firebaseInteractor.addUser(name);
    };
    yield call(updateWithSuccess);
    yield put(singleRequest.success({ id: id }));
  } catch (error) {
    yield put(singleRequest.error());
  }
}
