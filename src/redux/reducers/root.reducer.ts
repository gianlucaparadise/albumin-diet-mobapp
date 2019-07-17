import { combineReducers } from 'redux';
import { tagReducer } from './tag.reducer';
import { searchReducer } from './search.reducer';
import { listeningListReducer } from './listening-list.reducer';
import { myAlbumsReducer } from './my-albums.reducer';
import { albumDetailReducer } from './album-detail.reducer';

export const rootReducer = combineReducers({
    tagReducer: tagReducer,
    searchReducer: searchReducer,
    listeningListReducer: listeningListReducer,
    myAlbumsReducer: myAlbumsReducer,
    albumDetailReducer: albumDetailReducer
});

export type AppState = ReturnType<typeof rootReducer>;