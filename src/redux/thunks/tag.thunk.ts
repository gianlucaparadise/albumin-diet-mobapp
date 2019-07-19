import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadTagsAction, errorTagAction } from "../actions/tag.actions";
import { ITag, TaggedAlbum } from "albumin-diet-types";
import { updateCurrentAlbum } from "./album-detail.thunk";
import { updateMyAlbum } from "./my-albums.thunk";

export const loadTags = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        const response = await ConnectionHelper.Instance.getTags();
        dispatch(
            loadTagsAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadTags');
        console.log(error);
        dispatch(
            errorTagAction(error)
        );
    }
}

export const addTag = (tagName: string, albumId: string): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const tagReducer = getState().tagReducer;
    const tags = tagReducer.tags ? tagReducer.tags : [];
    const albumDescriptor = getState().albumDetailReducer.albumDescriptor;

    try {
        const tag = { name: tagName, uniqueId: tagName };
        //#region Temporarily add this tag to the list
        const newTags = [...tags, tag];
        dispatch(loadTagsAction(newTags));
        //#endregion

        //#region Temporarily add this tag to the album
        let newAlbumTags: ITag[] | null = null;
        if (albumDescriptor) {
            newAlbumTags = [...albumDescriptor.tags, tag];
            const newAlbumDescriptor: TaggedAlbum = { ...albumDescriptor, tags: newAlbumTags };
            dispatch(updateCurrentAlbum(newAlbumDescriptor));
        }
        //#endregion

        // Refreshing from backend
        const response = await ConnectionHelper.Instance.addTagToAlbum(tagName, albumId);
        dispatch(loadTags());

        // Updating my albums list
        if (newAlbumTags) {
            dispatch(
                updateMyAlbum(albumId, { tags: newAlbumTags })
            );
        }

    } catch (error) {
        console.log('Error while loadTags');
        console.log(error);
        dispatch(
            errorTagAction(error)
        );
        // On error, I set the old tags list
        dispatch(
            loadTagsAction([...tags])
        );
        // On error, I set the old albumDescriptor
        if (albumDescriptor) {
            dispatch(
                updateCurrentAlbum({ ...albumDescriptor })
            );
        }
    }
}

export const deleteTag = (tag: ITag, albumId: string): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const tagReducer = getState().tagReducer;
    const tags = tagReducer.tags ? tagReducer.tags : [];
    const albumDescriptor = getState().albumDetailReducer.albumDescriptor;

    try {
        //#region Temporarily remove this tag from the list
        const newTags = [...tags];
        const tagIndex = newTags.indexOf(tag);
        newTags.splice(tagIndex, 1);
        dispatch(loadTagsAction(newTags));
        //#endregion

        //#region Temporarily remove this tag from the album
        let newAlbumTags: ITag[] | null = null;
        if (albumDescriptor) {
            newAlbumTags = [...albumDescriptor.tags];
            const tagIndex = newAlbumTags.indexOf(tag);
            newAlbumTags.splice(tagIndex, 1);
            const newAlbumDescriptor: TaggedAlbum = { ...albumDescriptor, tags: newAlbumTags };
            dispatch(updateCurrentAlbum(newAlbumDescriptor));
        }
        //#endregion

        const response = await ConnectionHelper.Instance.deleteTagFromAlbum(tag.name, albumId);
        dispatch(loadTags());

        // Updating my albums list
        if (newAlbumTags) {
            dispatch(
                updateMyAlbum(albumId, { tags: newAlbumTags })
            );
        }

    } catch (error) {
        console.log('Error while loadTags');
        console.log(error);
        dispatch(
            errorTagAction(error)
        );
        // On error, I set the old tags list
        dispatch(
            loadTagsAction([...tags])
        );
        // On error, I set the old albumDescriptor
        if (albumDescriptor) {
            dispatch(
                updateCurrentAlbum({ ...albumDescriptor })
            );
        }
    }
}