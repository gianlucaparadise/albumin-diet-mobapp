import { TaggedAlbum, UserAlbum } from 'albumin-diet-types';
import {
  AlbumDetailActions,
  AlbumDetailActionTypes,
} from '../actions/album-detail.actions';

export type AlbumEggableMap = { [albumId: string]: boolean };
export interface AlbumDetailState {
  albumDescriptor?: TaggedAlbum;
  canSave: boolean;
  canAlbumBeEggedMap: AlbumEggableMap;
  errorMessage?: string;
}

const initialState: AlbumDetailState = {
  canSave: true,
  canAlbumBeEggedMap: {},
};

export function getCanBeEgged(
  canAlbumBeEggedMap: AlbumEggableMap,
  albumDescriptor?: UserAlbum,
) {
  if (!albumDescriptor) {
    return true;
  }

  const albumId = albumDescriptor.album.id;
  if (!(albumId in canAlbumBeEggedMap)) {
    return true;
  }

  return canAlbumBeEggedMap[albumId];
}

export function albumDetailReducer(
  state = initialState,
  action: AlbumDetailActions,
): AlbumDetailState {
  switch (action.type) {
    case AlbumDetailActionTypes.SelectAlbum:
      return {
        ...state,
        albumDescriptor: action.payload.albumDescriptor,
      };

    case AlbumDetailActionTypes.ChangeCanSave:
      return {
        ...state,
        canSave: action.payload.canSave,
      };

    case AlbumDetailActionTypes.ChangeCanEgg:
      return {
        ...state,
        canAlbumBeEggedMap: {
          ...state.canAlbumBeEggedMap,
          [action.payload.albumId]: action.payload.canEgg,
        },
      };

    case AlbumDetailActionTypes.Error:
      return {
        ...state,
        errorMessage: 'Error',
      };

    default:
      return state;
  }
}
