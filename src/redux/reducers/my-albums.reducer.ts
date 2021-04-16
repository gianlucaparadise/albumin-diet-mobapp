import { UserAlbum } from 'albumin-diet-types';
import {
  MyAlbumsActionTypes,
  MyAlbumsActions,
} from '../actions/my-albums.actions';

export interface MyAlbumsState {
  tags: string[] | null;
  showUntagged: boolean;
  albumDescriptors?: UserAlbum[];
  errorMessage?: string;
}

const initialState: MyAlbumsState = {
  tags: [],
  showUntagged: false,
  albumDescriptors: [],
};

export function myAlbumsReducer(
  state = initialState,
  action: MyAlbumsActions,
): MyAlbumsState {
  switch (action.type) {
    case MyAlbumsActionTypes.Load:
      return {
        tags: action.payload.tags,
        showUntagged: action.payload.showUntagged,
        albumDescriptors: action.payload.albumDescriptors,
      };

    case MyAlbumsActionTypes.LoadNext:
      // When I don't have new descriptors, I return previous state to stop pagination
      if (
        !action.payload.albumDescriptors ||
        action.payload.albumDescriptors.length === 0
      ) {
        return state;
      }

      return {
        ...state,
        albumDescriptors: [
          ...(state.albumDescriptors || []),
          ...action.payload.albumDescriptors,
        ],
      };

    case MyAlbumsActionTypes.Error:
      return {
        ...state,
        errorMessage: 'Error',
      };

    default:
      return state;
  }
}
