import { TaggedAlbum } from "albumin-diet-types";
import { AlbumDetailActions, AlbumDetailActionTypes } from "../actions/album-detail.actions";

export interface AlbumDetailState {
    albumDescriptor?: TaggedAlbum;
    canSave: boolean;
    errorMessage?: string;
}

const initialState: AlbumDetailState = {
    canSave: true
}

export function albumDetailReducer(
    state = initialState,
    action: AlbumDetailActions
): AlbumDetailState {
    switch (action.type) {
        case AlbumDetailActionTypes.SelectAlbum:
            return {
                ...state,
                albumDescriptor: action.payload.albumDescriptor,
            };

        case AlbumDetailActionTypes.ChangeCanSave:
            return {
                ...state,
                canSave: action.payload.canSave,
            };

        case AlbumDetailActionTypes.Error:
            return {
                ...state,
                errorMessage: 'Error'
            };

        default:
            return state
    }
}