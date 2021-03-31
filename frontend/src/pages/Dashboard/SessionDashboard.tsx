import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { SessionStats } from "../../models/types";
import { CLOUD, INK } from "../../constants/colors";

interface SessionDashboardParams {
  userId?: string;
  sessionId?: number;
  userSessionData: SessionStats;
}

interface StatParams {
  number: number;
  description: string;
}

const StatContainer = styled.ul`
  padding: 24px;
`;

const StatTitle = styled.p`
  color: #000000;
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
`;

const FormattedStat = styled.li`
  font-family: "Rubik";
  font-size: 20px;
  font-weight: 700;
  text-transform: lowercase;
  background: ${CLOUD};
  list-style: none;
  border-radius: 12px;
  padding: 24px;
  margin: 12px 0px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    display: block;
  }
`;

const StatNumber = styled.p`
  color: ${INK};
  margin: 0px;
  padding: 0 0 0 0.5em;
  @media (max-width: 900px) {
    padding: 0;
  }
`;

const StatDescription = styled.p`
  color: #000000;
  margin: 0px;
`;

const Stat: FunctionComponent<StatParams> = ({
  number,
  description,
}) => {
  return (
    <FormattedStat>
      <StatDescription>{description}</StatDescription>
      <StatNumber>{formatNumber(number)}</StatNumber>
    </FormattedStat>
  );
};

const formatNumber = (number: number) => {
  let minutes = Math.floor(number / 60);
  let seconds = Math.floor(number - minutes * 60);
  return minutes + "'" + seconds + '"';
};

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  userId,
  sessionId,
  userSessionData,
}) => {
  return (
    <StatContainer>
      <StatTitle>stats</StatTitle>
      <Stat
        number={userSessionData.assessmentDuration}
        description={"assessments completion time"}
      />
      <Stat
        number={userSessionData.interventionDuration}
        description={"interventions completion time"}
      />
      <Stat
        number={userSessionData.incorrectWords}
        description={"words answered correctly"}
      />
      <Stat
        number={userSessionData.correctWords}
        description={"words answered incorrectly"}
      />
    </StatContainer>
  );
};

export default SessionDashboard;
