import { UserAlbum } from "albumin-diet-types";

export enum ListeningListActionTypes {
    Error = '[ListeningList API] ListeningList API Error',

    Load = '[ListeningList Page] Load ListeningList',
    LoadNext = '[ListeningList Page] Load Next Page ListeningList',
}

export interface ListeningListLoadAction {
    type: typeof ListeningListActionTypes.Load;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface ListeningListLoadNextAction {
    type: typeof ListeningListActionTypes.LoadNext;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface ListeningListErrorAction {
    type: typeof ListeningListActionTypes.Error;
    payload: { err: any }
}

export type ListeningListActions =
    ListeningListErrorAction |
    ListeningListLoadAction | ListeningListLoadNextAction;

// Action creator
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
