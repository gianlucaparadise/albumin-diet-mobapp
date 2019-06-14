import { ITag } from "albumin-diet-types";
import { TagActionTypes, TagActions } from "../actions/tag.actions";

export interface TagState {
    tags?: ITag[];
    errorMessage?: string;
}

const initialState: TagState = {
    tags: []
}

export function tagReducer(
    state = initialState,
    action: TagActions
): TagState {
    switch (action.type) {
        case TagActionTypes.Load:
            return {
                tags: action.payload.tags
            }
        default:
            return state
    }
}