import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadSearchAction, clearSearchAction, loadNextSearchAction } from "../actions/search.actions";

export const loadSearch = (query: string): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    const response = await ConnectionHelper.Instance.searchAlbums(query);
    dispatch(
        loadSearchAction(query, response.data)
    );
}

export const loadSearchNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const searchState = getState().searchReducer;
    const query = searchState.query || '';
    const prevSearch = searchState.albumDescriptors || [];
    const offset = prevSearch.length;

    const response = await ConnectionHelper.Instance.searchAlbums(query, offset);
    dispatch(
        loadNextSearchAction(response.data)
    );
}

export const clearSearch = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    dispatch(
        clearSearchAction()
    );
}