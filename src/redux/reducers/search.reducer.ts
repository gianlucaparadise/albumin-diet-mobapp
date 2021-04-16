import { UserAlbum } from 'albumin-diet-types';
import { SearchActionTypes, SearchActions } from '../actions/search.actions';

export interface SearchState {
  query?: string;
  albumDescriptors?: UserAlbum[];
  errorMessage?: string;
}

const initialState: SearchState = {
  query: '',
  albumDescriptors: [],
};

export function searchReducer(
  state = initialState,
  action: SearchActions,
): SearchState {
  switch (action.type) {
    case SearchActionTypes.Load:
      return {
        query: action.payload.query,
        albumDescriptors: action.payload.albumDescriptors,
      };

    case SearchActionTypes.LoadNext:
      return {
        ...state,
        albumDescriptors: [
          ...(state.albumDescriptors || []),
          ...action.payload.albumDescriptors,
        ],
      };

    case SearchActionTypes.Clear:
      return {
        albumDescriptors: [],
      };

    case SearchActionTypes.Error:
      return {
        ...state,
        errorMessage: 'Error',
      };

    default:
      return state;
  }
}
