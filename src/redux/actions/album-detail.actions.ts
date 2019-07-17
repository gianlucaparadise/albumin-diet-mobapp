import { TaggedAlbum } from "albumin-diet-types";

export enum AlbumDetailActionTypes {
    Error = '[AlbumDetail API] AlbumDetail API Error',

    SelectAlbum = '[AlbumDetail Page] Select AlbumDetail',
    ChangeCanSave = '[AlbumDetail Page] ChangeCanSave AlbumDetail',
}

export interface SelectAlbumAction {
    type: typeof AlbumDetailActionTypes.SelectAlbum;
    payload: {
        albumDescriptor: TaggedAlbum
    }
}

export interface ChangeCanSaveAlbumAction {
    type: typeof AlbumDetailActionTypes.ChangeCanSave;
    payload: {
        canSave: boolean
    }
}

export interface AlbumDetailErrorAction {
    type: typeof AlbumDetailActionTypes.Error;
    payload: { err: any }
}

export type AlbumDetailActions =
    AlbumDetailErrorAction |
    ChangeCanSaveAlbumAction |
    SelectAlbumAction;

export function selectAlbumAction(albumDescriptor: TaggedAlbum): AlbumDetailActions {
    return {
        type: AlbumDetailActionTypes.SelectAlbum,
        payload: {
            albumDescriptor
        }
    }
}

export function changeCanSaveAction(canSave: boolean): AlbumDetailActions {
    return {
        type: AlbumDetailActionTypes.ChangeCanSave,
        payload: {
            canSave
        }
    }
}

export function errorAlbumDetailAction(err: any): AlbumDetailActions {
    return {
        type: AlbumDetailActionTypes.Error,
        payload: {
            err
        }
    }
}
