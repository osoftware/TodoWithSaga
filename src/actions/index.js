import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

export const progressTuturial = (index) => ({ type: types.PROGRESS_TUTORIAL, payload: { index } });

export const getAdvice = {
    start: () => ({ type: types.ADVICE_STARTED }),
    done: (payload) => ({ type: types.ADVICE_DONE, payload }),
    fail: (error) => ({ type: types.ADVICE_FAILED, error }),
}