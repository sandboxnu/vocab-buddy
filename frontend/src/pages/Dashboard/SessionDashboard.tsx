import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { User } from "../../models/types";
import { useHistory } from "react-router-dom";

interface SessionDashboardParams {
  student: User;
  session: number;
}

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  student,
  session,
}) => {
  let history = useHistory();
  //history.push("/assessments/reward");

  return <></>;
};

export default SessionDashboard;
