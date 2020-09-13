import { takeLatest, put, all } from 'redux-saga/effects';
import { types, requestForCourses, requestToSort } from './actions';

export default function* rootSaga() {
  yield all([
    root(),
  ]);
}

function* root() {
  yield takeLatest(types.REQUEST_FOR_COURSES_REQUEST, watchRequestForCourses);
  yield takeLatest(types.REQUEST_TO_SORT_REQUEST, watchRequestToSort);
}

const URL = 'http://localhost:3000/course';

function* watchRequestForCourses() {
  try {
    // replace the following url with the URL above
    const response = yield fetch(URL)
    .then(response => response.json());
    yield put(requestForCourses.success({ response }));
  } catch (e) {
    yield put(requestForCourses.error());
    console.log(e);
  }
}

function* watchRequestToSort(actions) {
  const payload = actions.payload;
  try {
    const response = yield fetch(URL,
    {
      method : 'POST',
      headers: { 
        Accept: 'application/json',
        'Content-type': 'application/json' 
      },
      body: JSON.stringify(payload),
    }).then(response => response.json());
    yield put(requestToSort.success({ response }));
  } catch (e) {
    yield put(requestToSort.error());
  }
}
