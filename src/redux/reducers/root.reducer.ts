import { combineReducers } from 'redux';
import { tagReducer } from './tag.reducer';
import { searchReducer } from './search.reducer';

export const rootReducer = combineReducers({
    tagReducer: tagReducer,
    searchReducer: searchReducer,
});

export type AppState = ReturnType<typeof rootReducer>;