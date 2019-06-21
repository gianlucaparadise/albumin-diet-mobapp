import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadMyAlbumsAction, loadNextMyAlbumsAction } from "../actions/my-albums.actions";
import { TaggedAlbum } from "albumin-diet-types";

export const loadMyAlbums = (tags: string[], showUntagged: boolean): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    const response = await ConnectionHelper.Instance.getAlbums(tags, showUntagged);
    dispatch(
        loadMyAlbumsAction(tags, showUntagged, response.data)
    );
}

export const loadMyAlbumsNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const myAlbumsState = getState().myAlbumsReducer;
    const tags = myAlbumsState.tags;
    const showUntagged = myAlbumsState.showUntagged || false;
    const prevMyAlbums = myAlbumsState.albumDescriptors || [];
    const offset = prevMyAlbums.length;

    const response = await ConnectionHelper.Instance.getAlbums(tags, showUntagged, offset);
    dispatch(
        loadNextMyAlbumsAction(response.data)
    );
}

// export const addToMyAlbums = (albumDescriptor: TaggedAlbum): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
//     const myAlbumsState = getState().myAlbumsReducer;
//     const myAlbums = myAlbumsState.albumDescriptors || [];
//     myAlbums.push(albumDescriptor);
//     dispatch(
//         loadMyAlbumsAction(myAlbums)
//     );
// }

export const removeFromMyAlbums = (albumId: string): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const myAlbumsState = getState().myAlbumsReducer;
    const tags = myAlbumsState.tags;
    const showUntagged = myAlbumsState.showUntagged || false;
    const myAlbums = myAlbumsState.albumDescriptors || [];

    const toBeRemoved = myAlbums.findIndex(a => a.album.id === albumId);
    const removed = myAlbums.splice(toBeRemoved, 1);

    dispatch(
        loadMyAlbumsAction(tags, showUntagged, myAlbums)
    );
}