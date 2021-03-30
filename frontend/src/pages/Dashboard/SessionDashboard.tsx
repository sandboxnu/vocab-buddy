import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { SessionStats, User } from "../../models/types";
import {
  GetUserSessionDataRequestProps,
  GetUserSessionData,
} from "./data/actions";
import { getSessionStats } from "./data/reducer";

const connector = connect(
  (state) => ({
    userSessionData: getSessionStats(state),
  }),
  {
    getUserSessionData: GetUserSessionData.request,
  }
);
interface SessionDashboardParams {
  userId?: string;
  sessionId?: number;
  userSessionData?: SessionStats;
  getUserSessionData?: (val: GetUserSessionDataRequestProps) => void;
}

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  userId,
  sessionId,
  userSessionData,
  getUserSessionData,
}) => {
  useEffect(() => {
    if (
      !userSessionData &&
      userId &&
      sessionId &&
      getUserSessionData
    ) {
      getUserSessionData({ userId, sessionId });
    }
  }, [userSessionData, userId, sessionId, getUserSessionData]);

  return (
    <>
      <p>{userSessionData?.assessmentDuration} </p>
      <p>{userSessionData?.interventionDuration} </p>
      <p>{userSessionData?.incorrectWords} </p>
      <p>{userSessionData?.correctWords} </p>
    </>
  );
};

export default connector(SessionDashboard);
