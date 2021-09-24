import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers/root.reducer';
import { AnyAction } from 'redux';
import { ConnectionHelper } from '../../helpers/ConnectionHelper';
import { TaggedAlbum, UserAlbum } from 'albumin-diet-types';
import { removeFromMyAlbums, addToMyAlbums } from './my-albums.thunk';
import {
  selectAlbumAction,
  errorAlbumDetailAction,
  changeCanSaveAction,
  changeCanEggAction,
} from '../actions/album-detail.actions';
import {
  removeFromLocalListeningList,
  addToLocalListeningList,
} from './listening-list.thunk';

/**
 * This thunk saves the input album as selected and refreshes it from backend
 */
export const loadAlbum = (
  albumDescriptor: TaggedAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (dispatch) => {
  try {
    const albumsResponse = await ConnectionHelper.Instance.getAlbum(
      albumDescriptor.album.id,
    );
    const albumDescriptorResponse = albumsResponse.data;

    dispatch(selectAlbumAction(albumDescriptorResponse));
  } catch (error) {
    console.log('Error while loadAlbum');
    console.log(error);
    dispatch(errorAlbumDetailAction(error));
  }
};

/**
 * This thunk saves the input album as selected, but only if the previous selected is the same as the input
 */
export const updateCurrentAlbum = (
  albumDescriptor: TaggedAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (
  dispatch,
  getState,
  ) => {
    try {
      const prevAlbumDescriptor = getState().albumDetailReducer.albumDescriptor;
      const prevAlbumId = prevAlbumDescriptor ? prevAlbumDescriptor.album.id : '';

      if (prevAlbumId != albumDescriptor.album.id) {
        return;
      }

      dispatch(selectAlbumAction(albumDescriptor));
    } catch (error) {
      console.log('Error while updateCurrentAlbum');
      console.log(error);
      dispatch(errorAlbumDetailAction(error));
    }
  };

export const unsaveAlbum = (
  albumDescriptor: TaggedAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (dispatch) => {
  try {
    dispatch(changeCanSaveAction(false));

    const albumId = albumDescriptor.album.id;
    await ConnectionHelper.Instance.unsaveAlbum(albumId);

    const newAlbumDescriptor: TaggedAlbum = {
      ...albumDescriptor,
      isSavedAlbum: false,
    };

    dispatch(updateCurrentAlbum(newAlbumDescriptor));
    dispatch(removeFromMyAlbums(albumId));
  } catch (error) {
    console.log('Error while unsaveAlbum');
    console.log(error);
    dispatch(errorAlbumDetailAction(error));
  } finally {
    dispatch(changeCanSaveAction(true));
  }
};

export const saveAlbum = (
  albumDescriptor: TaggedAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (dispatch) => {
  try {
    dispatch(changeCanSaveAction(false));

    const albumId = albumDescriptor.album.id;
    const response = await ConnectionHelper.Instance.saveAlbum(albumId);

    const newAlbumDescriptor: TaggedAlbum = response.data;

    dispatch(updateCurrentAlbum(newAlbumDescriptor));
    dispatch(addToMyAlbums(newAlbumDescriptor));
  } catch (error) {
    console.log('Error while saveAlbum');
    console.log(error);
    dispatch(errorAlbumDetailAction(error));
  } finally {
    dispatch(changeCanSaveAction(true));
  }
};

export const deleteFromListeningList = (
  albumDescriptor: UserAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (dispatch) => {
  try {
    dispatch(changeCanEggAction(albumDescriptor.album.id, false));

    const albumId = albumDescriptor.album.id;
    await ConnectionHelper.Instance.deleteFromListeningList(albumId);

    const newAlbumDescriptor: TaggedAlbum = {
      ...(albumDescriptor as TaggedAlbum),
      isInListeningList: false,
    };

    dispatch(updateCurrentAlbum(newAlbumDescriptor));
    dispatch(removeFromLocalListeningList(albumId));
  } catch (error) {
    console.log('Error while uneggAlbum');
    console.log(error);
    dispatch(errorAlbumDetailAction(error));
  } finally {
    dispatch(changeCanEggAction(albumDescriptor.album.id, true));
  }
};

export const addToListeningList = (
  albumDescriptor: UserAlbum,
): ThunkAction<void, AppState, null, AnyAction> => async (dispatch) => {
  try {
    dispatch(changeCanEggAction(albumDescriptor.album.id, false));

    await ConnectionHelper.Instance.addToListeningList(albumDescriptor);

    const newAlbumDescriptor: TaggedAlbum = {
      ...(albumDescriptor as TaggedAlbum),
      isInListeningList: true,
    };

    dispatch(updateCurrentAlbum(newAlbumDescriptor));
    dispatch(addToLocalListeningList(newAlbumDescriptor));
  } catch (error) {
    console.log('Error while eggAlbum');
    console.log(error);
    dispatch(errorAlbumDetailAction(error));
  } finally {
    dispatch(changeCanEggAction(albumDescriptor.album.id, true));
  }
};
