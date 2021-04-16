import { ITag, TagDescriptor } from 'albumin-diet-types';

export enum TagActionTypes {
  Error = '[Tags API] Tags API Error',

  Load = '[Tags Page] Load Tags',
}

export interface TagsLoadAction {
  type: typeof TagActionTypes.Load;
  payload: { tags: TagDescriptor[] };
}

export interface TagsErrorAction {
  type: typeof TagActionTypes.Error;
  payload: { err: any };
}

export type TagActions = TagsErrorAction | TagsLoadAction;

// Action creator
export function loadTagsAction(tags: TagDescriptor[]): TagActions {
  return {
    type: TagActionTypes.Load,
    payload: {
      tags,
    },
  };
}

export function errorTagAction(err: any): TagActions {
  return {
    type: TagActionTypes.Error,
    payload: {
      err,
    },
  };
}
