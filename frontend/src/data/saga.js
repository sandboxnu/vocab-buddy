import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import { singleRequest, types } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(types.REQUEST, watchSingleRequest);
  yield takeLatest(types.ADDUSER, watchAddUser);
  yield takeLatest(types.DOWNLOADIMAGE, watchDownloadImage);
  yield takeLatest(types.GET_WORDS, watchGetWords);
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

function* watchDownloadImage(action) {
  let { imageURL } = action.payload;
  try {
    let image;
    const updateWithSuccess = async () => {
      image = await firebaseInteractor.downloadImage(imageURL);
    };
    yield call(updateWithSuccess);
    yield put(singleRequest.success({ imageURL: image }));
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}

function* watchGetWords(action) {
  try {
    let words;
    const updateWithSuccess = async () => {
      words = await firebaseInteractor.getWords();
    };
    yield call(updateWithSuccess);
    yield put(singleRequest.getWordsSuccess({ words }));
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}
