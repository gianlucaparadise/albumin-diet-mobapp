import { UserAlbum, TaggedAlbum } from "albumin-diet-types";

export enum ListeningListActionTypes {
    Error = '[ListeningList API] ListeningList API Error',

    Load = '[ListeningList Page] Load ListeningList',
    LoadNext = '[ListeningList Page] Load Next Page ListeningList',

    Add = '[ListeningList API] Add to ListeningList',
    Remove = '[ListeningList API] Remove from ListeningList',
}

export interface ListeningListLoadAction {
    type: typeof ListeningListActionTypes.Load;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface ListeningListLoadNextAction {
    type: typeof ListeningListActionTypes.LoadNext;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface ListeningListAddAction {
    type: typeof ListeningListActionTypes.Add;

    payload: { albumDescriptor: TaggedAlbum };
}

export interface ListeningListRemoveAction {
    type: typeof ListeningListActionTypes.Remove;

    payload: { albumId: string };
}

export interface ListeningListErrorAction {
    type: typeof ListeningListActionTypes.Error;
    payload: { err: any }
}

export type ListeningListActions =
    ListeningListErrorAction |
    ListeningListLoadAction | ListeningListLoadNextAction |
    ListeningListAddAction | ListeningListRemoveAction;

// Action creator
// TODO: to be converted to action constructors
export function loadListeningListAction(albumDescriptors: UserAlbum[]): ListeningListActions {
    return {
        type: ListeningListActionTypes.Load,
        payload: {
            albumDescriptors
        }
    };
}

export function loadNextListeningListAction(albumDescriptors: UserAlbum[]): ListeningListActions {
    return {
        type: ListeningListActionTypes.LoadNext,
        payload: {
            albumDescriptors
        }
    };
}

export function addToListeningListAction(albumDescriptor: TaggedAlbum): ListeningListActions {
    return {
        type: ListeningListActionTypes.Add,
        payload: {
            albumDescriptor
        }
    };
}

export function removeFromListeningListAction(albumId: string): ListeningListActions {
    return {
        type: ListeningListActionTypes.Remove,
        payload: {
            albumId
        }
    };
}
