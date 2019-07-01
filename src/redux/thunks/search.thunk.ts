import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadSearchAction, clearSearchAction, loadNextSearchAction, errorSearchAction } from "../actions/search.actions";

export const loadSearch = (query: string): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        const response = await ConnectionHelper.Instance.searchAlbums(query);
        dispatch(
            loadSearchAction(query, response.data)
        );
    } catch (error) {
        console.log('Error while loadSearch');
        console.log(error);
        dispatch(
            errorSearchAction(error)
        );
    }
}

export const loadSearchNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const searchState = getState().searchReducer;
        const query = searchState.query || '';
        const prevSearch = searchState.albumDescriptors || [];
        const offset = prevSearch.length;

        const response = await ConnectionHelper.Instance.searchAlbums(query, offset);
        dispatch(
            loadNextSearchAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadSearchNext');
        console.log(error);
        dispatch(
            errorSearchAction(error)
        );
    }
}

/**
 * This action sets the input props to the input album
 */
export const updateSearchAlbum = (albumId: string, props: any): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const state = getState().searchReducer;
        if (!state.albumDescriptors) {
            return;
        }

        const albums = [...state.albumDescriptors];

        const albumIndex = albums.findIndex(a => a.album.id === albumId);
        if (albumIndex < 0) {
            return;
        }

        const albumDescriptor = albums[albumIndex];
        albums[albumIndex] = {
            ...albumDescriptor,
            ...props
        };

        dispatch(
            loadSearchAction(
                state.query || '',
                albums,
            )
        );

    } catch (error) {
        console.log('Error while updateSearchAlbum');
        console.log(error);
        dispatch(
            errorSearchAction(error)
        );
    }
}

export const clearSearch = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    dispatch(
        clearSearchAction()
    );
}