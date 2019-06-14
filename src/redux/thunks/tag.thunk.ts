import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { Action } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadTagsAction } from "../actions/tag.actions";

export const loadTags = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const response = await ConnectionHelper.Instance.getTags();
    dispatch(
        loadTagsAction(response.data)
    );
}