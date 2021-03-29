import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { SessionStats, User } from "../../models/types";
import { GetUserSessionDataRequestProps } from "./data/actions";

interface SessionDashboardParams {
  student?: User;
  sessionId?: number;
  studentStats: SessionStats;
  getUserSessionData: (val: GetUserSessionDataRequestProps) => void;
}

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  student,
  sessionId,
  studentStats,
  getUserSessionData,
}) => {
  return (
    <>
      <p>{studentStats.assessmentDuration} </p>
      <p>{studentStats.interventionDuration} </p>
      <p>{studentStats.incorrectWords} </p>
      <p>{studentStats.correctWords} </p>
    </>
  );
};

export default SessionDashboard;
