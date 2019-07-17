import { UserAlbum, TaggedAlbum } from "albumin-diet-types";

export enum MyAlbumsActionTypes {
    Error = '[MyAlbums API] MyAlbums API Error',

    Load = '[MyAlbums Page] Load MyAlbums',
    LoadNext = '[MyAlbums Page] Load Next Page MyAlbums',
}

export interface MyAlbumsLoadAction {
    type: typeof MyAlbumsActionTypes.Load;
    payload: {
        tags: string[] | null,
        showUntagged: boolean,
        albumDescriptors: UserAlbum[],
    }
}

export interface MyAlbumsLoadNextAction {
    type: typeof MyAlbumsActionTypes.LoadNext;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface MyAlbumsErrorAction {
    type: typeof MyAlbumsActionTypes.Error;
    payload: { err: any }
}

export type MyAlbumsActions =
    MyAlbumsErrorAction |
    MyAlbumsLoadAction | MyAlbumsLoadNextAction;

// Action creator
// TODO: to be converted to action constructors
export function loadMyAlbumsAction(tags: string[] | null, showUntagged: boolean, albumDescriptors: UserAlbum[]): MyAlbumsActions {
    return {
        type: MyAlbumsActionTypes.Load,
        payload: {
            tags,
            showUntagged,
            albumDescriptors,
        }
    };
}

export function loadNextMyAlbumsAction(albumDescriptors: UserAlbum[]): MyAlbumsActions {
    return {
        type: MyAlbumsActionTypes.LoadNext,
        payload: {
            albumDescriptors
        }
    };
}

export function errorMyAlbumsAction(err: any): MyAlbumsActions {
    return {
        type: MyAlbumsActionTypes.Error,
        payload: {
            err
        }
    }
}

