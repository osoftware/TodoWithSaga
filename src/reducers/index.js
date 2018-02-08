import { combineReducers } from 'redux'
import todos from './todos'
import tutorial from './tutorial';

const rootReducer = combineReducers({
  todos,
  tutorial
})

export default rootReducer
