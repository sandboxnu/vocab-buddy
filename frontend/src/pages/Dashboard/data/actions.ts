import { ActionTypes, User } from "../../../models/types";

export const SignOut = {
  request: () => ({
    type: ActionTypes.SIGN_OUT_REQUEST,
  }),
  success: () => ({
    type: ActionTypes.SIGN_OUT_SUCCESS,
  }),
  error: () => ({
    type: ActionTypes.SIGN_OUT_ERROR,
  }),
};

interface GetDashboardDataResponse {
  user?: User;
  totalWordsLearned?: number;
  error?: Error;
}

export interface GetDataRequestProps {
  id?: number;
}

export const GetData = {
  request: ({ id }: GetDataRequestProps) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_REQUEST,
    payload: { id },
  }),
  success: ({ user, totalWordsLearned }: GetDashboardDataResponse) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
    payload: { user, totalWordsLearned },
  }),
  error: ({ error }: GetDashboardDataResponse) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_ERROR,
    payload: { error },
  }),
};

export const ChangeProfileIcon = {
  request: (url: string) => ({
    type: ActionTypes.CHANGE_PROFILE_ICON_REQUEST,
    payload: { url },
  }),
  success: (url: string) => ({
    type: ActionTypes.CHANGE_PROFILE_ICON_SUCCESS,
    payload: { url },
  }),
  error: (error: Error) => ({
    type: ActionTypes.CHANGE_PROFILE_ICON_ERROR,
    payload: { error },
  }),
};
