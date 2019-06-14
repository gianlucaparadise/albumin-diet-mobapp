import { ITag } from 'albumin-diet-types';

export enum TagActionTypes {
    Error = '[Tags API] Tags API Error',

    Load = '[Tags Page] Load Tags',
}

export interface TagsLoadAction {
    type: typeof TagActionTypes.Load;
    payload: { tags: ITag[] }
}

export interface TagsErrorAction {
    type: typeof TagActionTypes.Error;
    payload: { err: any }
}

export type TagActions =
    TagsErrorAction |
    TagsLoadAction;

// Action creator
export function loadTagsAction(tags: ITag[]): TagActions {
    return {
        type: TagActionTypes.Load,
        payload: {
            tags
        }
    };
}