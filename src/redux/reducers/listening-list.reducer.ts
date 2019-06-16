import { UserAlbum } from "albumin-diet-types";
import { ListeningListActionTypes, ListeningListActions } from "../actions/listening-list.actions";

export interface ListeningListState {
    albumDescriptors?: UserAlbum[];
    errorMessage?: string;
}

const initialState: ListeningListState = {
    albumDescriptors: []
}

export function listeningListReducer(
    state = initialState,
    action: ListeningListActions
): ListeningListState {
    switch (action.type) {
        case ListeningListActionTypes.Load:
            return {
                albumDescriptors: action.payload.albumDescriptors
            };

        case ListeningListActionTypes.LoadNext:
            // When I don't have new descriptors, I return previous state to stop pagination    
            if (!action.payload.albumDescriptors || action.payload.albumDescriptors.length === 0) {
                return state;
            }

            return {
                ...state,
                albumDescriptors: [...(state.albumDescriptors || []), ...action.payload.albumDescriptors],
            };

        default:
            return state
    }
}