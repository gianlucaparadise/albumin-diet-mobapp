import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { TaggedAlbum } from "albumin-diet-types";
import { removeFromMyAlbums, addToMyAlbums } from "./my-albums.thunk";
import { selectAlbumAction, errorAlbumDetailAction, changeCanSaveAction } from "../actions/album-detail.actions";

/**
 * This thunk saves the input album as selected and refreshes it from web
 */
export const selectAlbumAndUpdate = (albumDescriptor: TaggedAlbum): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        dispatch(selectAlbumAction(albumDescriptor));

        const albumsResponse = await ConnectionHelper.Instance.getAlbum(albumDescriptor.album.id);
        const albumDescriptorResponse = albumsResponse.data;

        dispatch(selectAlbumAction(albumDescriptorResponse));

    } catch (error) {
        console.log('Error while selectAlbumAndUpdate');
        console.log(error);
        dispatch(
            errorAlbumDetailAction(error)
        );
    }
};

export const unsaveAlbum = (albumDescriptor: TaggedAlbum): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        dispatch(changeCanSaveAction(false));

        const albumId = albumDescriptor.album.id;
        const response = await ConnectionHelper.Instance.unsaveAlbum(albumId);

        const newAlbumDescriptor: TaggedAlbum = {
            ...albumDescriptor,
            isSavedAlbum: false
        };

        dispatch(selectAlbumAction(newAlbumDescriptor));
        dispatch(removeFromMyAlbums(albumId));
        dispatch(changeCanSaveAction(true));
    } catch (error) {
        console.log('Error while unsaveAlbum');
        console.log(error);
        dispatch(
            errorAlbumDetailAction(error)
        );
    }
}

export const saveAlbum = (albumDescriptor: TaggedAlbum): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        dispatch(changeCanSaveAction(false));

        const albumId = albumDescriptor.album.id;
        const response = await ConnectionHelper.Instance.saveAlbum(albumId);

        const newAlbumDescriptor: TaggedAlbum = response.data;

        dispatch(selectAlbumAction(newAlbumDescriptor));
        dispatch(addToMyAlbums(newAlbumDescriptor));
        dispatch(changeCanSaveAction(true));
    } catch (error) {
        console.log('Error while unsaveAlbum');
        console.log(error);
        dispatch(
            errorAlbumDetailAction(error)
        );
    }
}