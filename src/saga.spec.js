import { tutorialSaga, randomTipSaga } from './saga';
import { call, take, put } from 'redux-saga/effects'
import * as types from './constants/ActionTypes'
import { addTodo, getAdvice } from './actions/index';
import { getRandomAdvice } from './api';
import { delay } from 'redux-saga';


describe('Tutorial', () => {
    const saga = tutorialSaga();
    let value = null;
    it('should show 1st tip', () => {
        value = saga.next().value;
        expect(value).toEqual(put({ type: types.PROGRESS_TUTORIAL, payload: { index: 0 } }));
    });
    it('should wait for 1 task', () => {
        value = saga.next().value;
        expect(value.TAKE).toBeDefined();
        expect(value.TAKE.pattern).toEqual(types.ADD_TODO);
    });
    it('should show 2nd tip', () => {
        value = saga.next(put(addTodo('aaa'))).value;
        expect(value).toEqual(put({ type: types.PROGRESS_TUTORIAL, payload: { index: 1 } }));
    });
    it('should wait for 3 tasks', () => {
        expect(saga.next().value.TAKE.pattern).toEqual(types.ADD_TODO);
        expect(saga.next().value.TAKE.pattern).toEqual(types.ADD_TODO);
        expect(saga.next().value.TAKE.pattern).toEqual(types.ADD_TODO);
    });
    it('should show 3rd tip', () => {
        expect(saga.next().value).toEqual(put({ type: types.PROGRESS_TUTORIAL, payload: { index: 2 } }));
    });
    it('wait for 2 actions', () => {
        value = saga.next().value;
        expect(value.ALL).toBeDefined();
        expect(value.ALL[0].TAKE).toBeDefined();
        expect(value.ALL[1].TAKE).toBeDefined();
    });
    it('should show 4rd tip and wait for action', () => {
        expect(saga.next().value).toEqual(put({ type: types.PROGRESS_TUTORIAL, payload: { index: 3 } }));
        expect(saga.next().value).toEqual(take(types.CLEAR_COMPLETED));
    });
    it('should show random tip', () => {
        expect(saga.next().value).toEqual(call(randomTipSaga));
    });
    it('should wait 10 seconds and show next tip', () => {
        expect(saga.next().value).toEqual(call(delay, 10000));
        expect(saga.next().value).toEqual(call(randomTipSaga));
    });
});

describe('Random tip', () => {
    const saga = randomTipSaga();
    it('should put start action', () => {
        expect(saga.next().value).toEqual(put(getAdvice.start()));
    })
    it('should call api', () => {
        expect(saga.next().value).toEqual(call(getRandomAdvice));
    });
    it('should return api response in done action', () => {
        const step = saga.next({ advice: "api resp" });
        expect(step.value).toEqual(put(getAdvice.done({ advice: "api resp" })));
    });
});
