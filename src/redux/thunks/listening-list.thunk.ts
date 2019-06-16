import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadListeningListAction, loadNextListeningListAction } from "../actions/listening-list.actions";

export const loadListeningList = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    const response = await ConnectionHelper.Instance.getListeningList();
    dispatch(
        loadListeningListAction(response.data)
    );
}

export const loadListeningListNext = (): ThunkAction<void, AppState, null, AnyAction> => async (dispatch, getState) => {
    const listeningListState = getState().listeningListReducer;
    const prevListeningList = listeningListState.albumDescriptors || [];
    const offset = prevListeningList.length;

    const response = await ConnectionHelper.Instance.getListeningList(offset);
    dispatch(
        loadNextListeningListAction(response.data)
    );
}
