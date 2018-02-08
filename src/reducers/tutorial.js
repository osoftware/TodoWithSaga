import { PROGRESS_TUTORIAL, ADVICE_STARTED, ADVICE_FAILED, ADVICE_DONE } from '../constants/ActionTypes'
import tips from '../constants/Tutorial';

const initialState = { tip: '' };

export default function tutorial(state = initialState, action) {
    switch(action.type) {
        case PROGRESS_TUTORIAL:
            return { tip: tips[action.payload.index] };
        case ADVICE_STARTED:
            return { tip: 'Loading...' };
        case ADVICE_DONE:
            return { tip: action.payload.advice };
        case ADVICE_FAILED:
            return initialState;
        default:
            return state;
    }
}
