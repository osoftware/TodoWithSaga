import { all, call, take, put } from 'redux-saga/effects'
import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, CLEAR_COMPLETED } from "./constants/ActionTypes";
import { progressTuturial, getAdvice } from './actions/index';
import { getRandomAdvice } from './api';
import { delay } from 'redux-saga';

export function* tutorialSaga() {
    yield put(progressTuturial(0));
    yield take(ADD_TODO);

    yield put(progressTuturial(1));
    for (let i = 0; i < 3; i++) yield take(ADD_TODO);

    yield put(progressTuturial(2));
    yield all([
        take(action => action.type === COMPLETE_TODO && action.id),
        take(action => action.type === DELETE_TODO && action.id)
    ]);

    yield put(progressTuturial(3));
    yield take(CLEAR_COMPLETED);

    while (true) {
        yield call(randomTipSaga);
        yield call(delay, 10000);
    }
}

export function* randomTipSaga() {
    yield put(getAdvice.start());
    try {
        const response = yield call(getRandomAdvice);
        yield put(getAdvice.done(response));
    } catch (ex) {
        yield put(getAdvice.fail(ex));
    }
}
