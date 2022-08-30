import {
  ActionTypes,
  SessionStats,
  User,
  UserSettings,
} from '../../../models/types';

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
  id?: string;
}

export const GetData = {
  request: ({ id }: GetDataRequestProps) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_REQUEST,
    payload: { id },
  }),
  success: ({
    user,
    totalWordsLearned,
  }: GetDashboardDataResponse) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
    payload: { user, totalWordsLearned },
  }),
  requestStudentSuccess: ({
    user,
    totalWordsLearned,
  }: GetDashboardDataResponse) => ({
    type: ActionTypes.GET_REQUESTED_STUDENT_DASHBOARD_DATA_SUCCESS,
    payload: { user, totalWordsLearned },
  }),
  error: ({ error }: GetDashboardDataResponse) => ({
    type: ActionTypes.GET_DASHBOARD_DATA_ERROR,
    payload: { error },
  }),
};

interface GetDataForResearchersResponse {
  students?: User[];
  error?: Error;
}

export interface GetDataForResearchersRequestProps {
  id?: number;
}

export const GetDataForResearchers = {
  request: ({ id }: GetDataForResearchersRequestProps) => ({
    type: ActionTypes.GET_DATA_FOR_RESEARCHERS_REQUEST,
    payload: { id },
  }),
  success: ({ students }: GetDataForResearchersResponse) => ({
    type: ActionTypes.GET_DATA_FOR_RESEARCHERS_SUCCESS,
    payload: { students },
  }),
  error: ({ error }: GetDataForResearchersResponse) => ({
    type: ActionTypes.GET_DATA_FOR_RESEARCHERS_ERROR,
    payload: { error },
  }),
};

export interface GetUserSessionDataRequestProps {
  userId: string;
  sessionId: number;
}

interface GetUserSessionDataResponse {
  sessionStats?: SessionStats;
  error?: Error;
}

export const GetUserSessionData = {
  request: ({
    userId,
    sessionId,
  }: GetUserSessionDataRequestProps) => ({
    type: ActionTypes.GET_USER_SESSION_DATA_REQUEST,
    payload: { userId, sessionId },
  }),
  success: ({ sessionStats }: GetUserSessionDataResponse) => ({
    type: ActionTypes.GET_USER_SESSION_DATA_SUCCESS,
    payload: { sessionStats },
  }),
  error: ({ error }: GetUserSessionDataResponse) => ({
    type: ActionTypes.GET_USER_SESSION_DATA_ERROR,
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

interface UpdateUserSettingsSuccessResponse {
  user?: User;
}

interface UpdateUserSettingsErrorResponse {
  error: Error;
}

export const UpdateUserSettings = {
  request: ({
    newName,
    newAge,
    newEmail,
    newPassword,
    currentPassword,
  }: UserSettings) => ({
    type: ActionTypes.UPDATE_USER_SETTINGS_REQUEST,
    payload: {
      newName,
      newAge,
      newEmail,
      newPassword,
      currentPassword,
    },
  }),
  success: ({ user }: UpdateUserSettingsSuccessResponse) => ({
    type: ActionTypes.UPDATE_USER_SETTINGS_SUCCESS,
    payload: { user },
  }),
  error: (error: UpdateUserSettingsErrorResponse) => ({
    type: ActionTypes.UPDATE_USER_SETTINGS_ERROR,
    payload: { error },
  }),
};

export const DownloadData = {
  request: ({ userId, name }: { userId: string; name: string }) => ({
    type: ActionTypes.DOWNLOAD_USER_DATA_REQUEST,
    payload: { userId, name },
  }),
  success: () => ({
    type: ActionTypes.DOWNLOAD_USER_DATA_SUCCESS,
  }),
  error: () => ({
    type: ActionTypes.DOWNLOAD_USER_DATA_ERROR,
  }),
};
