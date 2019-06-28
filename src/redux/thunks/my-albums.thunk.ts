import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadMyAlbumsAction, loadNextMyAlbumsAction, errorMyAlbumsAction } from "../actions/my-albums.actions";
import { TaggedAlbum } from "albumin-diet-types";

export const loadMyAlbums = (tags: string[], showUntagged: boolean): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        const response = await ConnectionHelper.Instance.getAlbums(tags, showUntagged);
        dispatch(
            loadMyAlbumsAction(tags, showUntagged, response.data)
        );
    } catch (error) {
        console.log('Error while loadMyAlbums');
        console.log(error);
        dispatch(
            errorMyAlbumsAction(error)
        );
    }
}

export const loadMyAlbumsNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const myAlbumsState = getState().myAlbumsReducer;
        const tags = myAlbumsState.tags;
        const showUntagged = myAlbumsState.showUntagged;
        const prevMyAlbums = myAlbumsState.albumDescriptors || [];
        const offset = prevMyAlbums.length;

        const response = await ConnectionHelper.Instance.getAlbums(tags, showUntagged, offset);
        dispatch(
            loadNextMyAlbumsAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadMyAlbumsNext');
        console.log(error);
        dispatch(
            errorMyAlbumsAction(error)
        );
    }
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
    try {
        const myAlbumsState = getState().myAlbumsReducer;
        const tags = myAlbumsState.tags;
        const showUntagged = myAlbumsState.showUntagged;
        const myAlbums = myAlbumsState.albumDescriptors || [];

        const toBeRemoved = myAlbums.findIndex(a => a.album.id === albumId);
        const removed = myAlbums.splice(toBeRemoved, 1);

        dispatch(
            loadMyAlbumsAction(tags, showUntagged, myAlbums)
        );
    } catch (error) {
        console.log('Error while removeFromMyAlbums');
        console.log(error);
        dispatch(
            errorMyAlbumsAction(error)
        );
    }
}

/**
 * This action sets the input props to the input album
 */
export const updateMyAlbum = (albumId: string, props: any): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const state = getState().myAlbumsReducer;
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
            loadMyAlbumsAction(
                state.tags,
                state.showUntagged,
                albums,
            )
        );

    } catch (error) {
        console.log('Error while updateMyAlbum');
        console.log(error);
        dispatch(
            errorMyAlbumsAction(error)
        );
    }
}