import { ActionTypes } from "../../../models/types";

export const SignOut = {
    request: () => ({
        type: ActionTypes.SIGN_OUT_REQUEST
    }),
    success: () => ({
        type: ActionTypes.SIGN_OUT_SUCCESS
    }),
    error: () => ({
        type: ActionTypes.SIGN_OUT_ERROR
    })
}