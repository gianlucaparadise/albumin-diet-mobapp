import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadListeningListAction, loadNextListeningListAction, errorListeningListAction } from "../actions/listening-list.actions";
import { UserAlbum } from "albumin-diet-types";
import { updateMyAlbum } from "./my-albums.thunk";
import { updateSearchAlbum } from "./search.thunk";

export const loadListeningList = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        const response = await ConnectionHelper.Instance.getListeningList();
        dispatch(
            loadListeningListAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadListeningList');
        console.log(error);
        dispatch(
            errorListeningListAction(error)
        );
    }
}

export const loadListeningListNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const listeningListState = getState().listeningListReducer;
        const prevListeningList = listeningListState.albumDescriptors || [];
        const offset = prevListeningList.length;

        const response = await ConnectionHelper.Instance.getListeningList(offset);
        dispatch(
            loadNextListeningListAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadListeningListNext');
        console.log(error);
        dispatch(
            errorListeningListAction(error)
        );
    }
}

export const addToListeningList = (albumDescriptor: UserAlbum): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const listeningListState = getState().listeningListReducer;
        let listeningList: UserAlbum[];
        if (listeningListState.albumDescriptors) {
            listeningList = [...listeningListState.albumDescriptors];
        }
        else {
            listeningList = [];
        }

        listeningList.push({
            ...albumDescriptor,
            isInListeningList: true,
        });
        dispatch(
            loadListeningListAction(listeningList)
        );

        // Refresh MyAlbums
        dispatch(
            updateMyAlbum(albumDescriptor.album.id, { isInListeningList: true }),
        );

        // Refresh Search
        dispatch(
            updateSearchAlbum(albumDescriptor.album.id, { isInListeningList: true }),
        );

    } catch (error) {
        console.log('Error while addToListeningList');
        console.log(error);
        dispatch(
            errorListeningListAction(error)
        );
    }
}

export const removeFromListeningList = (albumId: string): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    try {
        const listeningListState = getState().listeningListReducer;
        if (!listeningListState.albumDescriptors) return;

        const listeningList = [...listeningListState.albumDescriptors];

        const toBeRemoved = listeningList.findIndex(a => a.album.id === albumId);
        const removed = listeningList.splice(toBeRemoved, 1);

        dispatch(
            loadListeningListAction(listeningList)
        );

        // Refresh MyAlbums
        dispatch(
            updateMyAlbum(albumId, { isInListeningList: false })
        );

        // Refresh SearchAlbums
        dispatch(
            updateSearchAlbum(albumId, { isInListeningList: false })
        );

    } catch (error) {
        console.log('Error while removeFromListeningList');
        console.log(error);
        dispatch(
            errorListeningListAction(error)
        );
    }
}