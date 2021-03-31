import React, { FunctionComponent, useEffect } from "react";
import { SessionStats } from "../../models/types";
interface SessionDashboardParams {
  userId?: string;
  sessionId?: number;
  userSessionData?: SessionStats;
}

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  userId,
  sessionId,
  userSessionData,
}) => {
  return (
    <>
      <p>{userSessionData?.assessmentDuration} </p>
      <p>{userSessionData?.interventionDuration} </p>
      <p>{userSessionData?.incorrectWords} </p>
      <p>{userSessionData?.correctWords} </p>
    </>
  );
};

export default SessionDashboard;
