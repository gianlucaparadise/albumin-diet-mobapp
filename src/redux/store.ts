import { createStore, compose, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AppState } from './reducers/root.reducer';

const enhancerList = [];
const devToolsExtension = window && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(thunk as ThunkMiddleware<AppState, AnyAction, null>), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);