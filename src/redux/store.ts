import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/root.reducer';

const enhancerList = [];
const devToolsExtension = window && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(thunk), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);