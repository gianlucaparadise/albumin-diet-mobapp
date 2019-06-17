import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadListeningListAction, loadNextListeningListAction } from "../actions/listening-list.actions";
import { TaggedAlbum } from "albumin-diet-types";

export const loadListeningList = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    const response = await ConnectionHelper.Instance.getListeningList();
    dispatch(
        loadListeningListAction(response.data)
    );
}

export const loadListeningListNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const listeningListState = getState().listeningListReducer;
    const prevListeningList = listeningListState.albumDescriptors || [];
    const offset = prevListeningList.length;

    const response = await ConnectionHelper.Instance.getListeningList(offset);
    dispatch(
        loadNextListeningListAction(response.data)
    );
}

export const addToListeningList = (albumDescriptor: TaggedAlbum): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const listeningListState = getState().listeningListReducer;
    const listeningList = listeningListState.albumDescriptors || [];
    listeningList.push(albumDescriptor);
    dispatch(
        loadListeningListAction(listeningList)
    );
}

export const removeFromListeningList = (albumId: string): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const listeningListState = getState().listeningListReducer;
    const listeningList = listeningListState.albumDescriptors || [];

    const toBeRemoved = listeningList.findIndex(a => a.album.id === albumId);
    const removed = listeningList.splice(toBeRemoved, 1);

    dispatch(
        loadListeningListAction(listeningList)
    );
}