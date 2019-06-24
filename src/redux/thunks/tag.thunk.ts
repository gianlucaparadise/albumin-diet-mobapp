import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/root.reducer";
import { AnyAction } from "redux";
import { ConnectionHelper } from "../../helpers/ConnectionHelper";
import { loadTagsAction, errorTagAction } from "../actions/tag.actions";

export const loadTags = (): ThunkAction<void, AppState, null, AnyAction> => async dispatch => {
    try {
        const response = await ConnectionHelper.Instance.getTags();
        dispatch(
            loadTagsAction(response.data)
        );
    } catch (error) {
        console.log('Error while loadTags');
        console.log(error);
        dispatch(
            errorTagAction(error)
        );
    }
}