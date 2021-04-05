import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SessionStats } from "../../models/types";
import { CLOUD, INK } from "../../constants/colors";

interface SessionDashboardParams {
  userSessionData: SessionStats;
}

interface StatParams {
  stat: string;
  description: string;
}

const DashboardRedirect = styled.div`
  color: ${INK};
  font-family: "Rubik";
  font-size: 18px;
  font-weight: 700;
  text-transform: lowercase;

  :hover {
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const SessionContainer = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
`;

const SessionHeader = styled.div`
  padding: 32px 0 0 32px;
`;

const SessionBody = styled.div`
  display: flex;
  flex: wrap;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const WordContainer = styled.div`
  flex: 3;
  order: 1;
  padding: 32px;
  @media (max-width: 900px) {
    flex: 1;
    order: 2;
  }
`;

const Word = styled.div`
  background: red;
  height: 70px;
`;

const SessionTitle = styled.p`
  color: #000000;
  font-family: "Rubik";
  font-size: 56px;
  font-weight: 700;
  @media (max-width: 900px) {
    font-size: 36px;
  }
`;
const StatContainer = styled.ul`
  flex: 2;
  order: 2;
  padding: 0 32px;
  @media (max-width: 900px) {
    flex: 1;
    order: 1;
  }
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
  stat,
  description,
}) => {
  return (
    <FormattedStat>
      <StatDescription>{description}</StatDescription>
      <StatNumber>{stat}</StatNumber>
    </FormattedStat>
  );
};

const formatDuration = (stat: number) => {
  let minutes = Math.floor(stat / 60);
  let seconds = Math.floor(stat - minutes * 60);
  return minutes + "'" + seconds + '"';
};

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  userSessionData,
}) => {
  const history = useHistory();
  return (
    <SessionContainer>
      <SessionHeader>
        <DashboardRedirect
          onClick={() => {
            history.push(
              `/dashboard/student/${userSessionData.userId}/`
            );
          }}
        >
          {"< back to " + userSessionData.userName + "'s data"}
        </DashboardRedirect>
        <SessionTitle>
          session {userSessionData.sessionId}
        </SessionTitle>
      </SessionHeader>
      <SessionBody>
        <WordContainer>
          <Word>miniscule</Word>
          <Word>construct</Word>
        </WordContainer>
        <StatContainer>
          <StatTitle>stats</StatTitle>
          <Stat
            stat={formatDuration(userSessionData.assessmentDuration)}
            description={"assessments completion time"}
          />
          <Stat
            stat={formatDuration(
              userSessionData.interventionDuration
            )}
            description={"interventions completion time"}
          />
          <Stat
            stat={userSessionData.correctWords.toString()}
            description={"words answered correctly"}
          />
          <Stat
            stat={userSessionData.incorrectWords.toString()}
            description={"words answered incorrectly"}
          />
        </StatContainer>
      </SessionBody>
    </SessionContainer>
  );
};

export default SessionDashboard;
