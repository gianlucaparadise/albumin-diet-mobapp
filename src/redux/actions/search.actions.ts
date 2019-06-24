import { UserAlbum } from "albumin-diet-types";

export enum SearchActionTypes {
    Error = '[Search API] Search API Error',

    Load = '[Search Page] Load Search',
    LoadNext = '[Search Page] Load Next Page Search',
    Clear = '[Search Page] Clear Search',
}

export interface SearchLoadAction {
    type: typeof SearchActionTypes.Load;
    payload: { query: string, albumDescriptors: UserAlbum[] }
}

export interface SearchLoadNextAction {
    type: typeof SearchActionTypes.LoadNext;
    payload: { albumDescriptors: UserAlbum[] }
}

export interface SearchClearAction {
    type: typeof SearchActionTypes.Clear;
}

export interface SearchErrorAction {
    type: typeof SearchActionTypes.Error;
    payload: { err: any }
}

export type SearchActions =
    SearchErrorAction |
    SearchLoadAction | SearchLoadNextAction |
    SearchClearAction;

// Action creator
export function loadSearchAction(query: string, albumDescriptors: UserAlbum[]): SearchActions {
    return {
        type: SearchActionTypes.Load,
        payload: {
            query,
            albumDescriptors
        }
    };
}

export function loadNextSearchAction(albumDescriptors: UserAlbum[]): SearchActions {
    return {
        type: SearchActionTypes.LoadNext,
        payload: {
            albumDescriptors
        }
    };
}

export function clearSearchAction(): SearchActions {
    return {
        type: SearchActionTypes.Clear
    };
}

export function errorSearchAction(err: any): SearchActions {
    return {
        type: SearchActionTypes.Error,
        payload: {
            err
        }
    }
}
