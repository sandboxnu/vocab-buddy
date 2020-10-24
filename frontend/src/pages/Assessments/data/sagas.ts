import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { ActionTypes } from "../../../models/types";
import { getWords } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* assessmentSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_WORDS_REQUEST, watchGetWords);
}

function* watchGetWords() {
  try {
    let words;
    const updateWithSuccess = async () => {
      words = await firebaseInteractor.getWords();
    };
    yield call(updateWithSuccess);
    yield put(getWords.success({ words }));
  } catch (error) {
    yield put(getWords.error({ error }));
  }
}
