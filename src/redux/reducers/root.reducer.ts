import { combineReducers } from 'redux';
import { tagReducer } from './tag.reducer';

export const rootReducer = combineReducers({
    tagReducer: tagReducer
});

export type AppState = ReturnType<typeof rootReducer>;