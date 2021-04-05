import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SessionStats, WordResult } from "../../models/types";
import {
  CLOUD,
  CORAL,
  GRAY,
  INK,
  SEA_FOAM,
} from "../../constants/colors";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

interface SessionDashboardParams {
  userSessionData: SessionStats;
  userName: string;
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
  padding: 0px 32px;
  @media (max-width: 900px) {
    flex: 1;
    order: 2;
    padding: 32px;
  }
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

const WordResultsContainer = styled.div`
  flex: 1;
`;

const WordResultWrapper = styled.div`
  margin-bottom: 15px;
`;

const StatsDiv = styled.div`
  display: flex;
  background-color: ${({ color }: { color: string }) => color};
  flex-direction: row;
  justify-content: space-between;
  padding: 3vh 1vw;
`;

const WordStatsContainer = styled.div`
  background-color: ${CLOUD};
  border-radius: 15px;
`;

const StatsIconContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StatsText = styled.p`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-right: 15px;
  margin-bottom: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const WordResultText = styled.p`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-right: 15px;
  margin-bottom: 0;
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

const StatsResultIcon = ({ result }: { result?: boolean }) => {
  return (
    <StatsIconContainer>
      {result === undefined ? (
        <>
          <StatsText>incomplete</StatsText>
          <MinusCircleFilled style={{ color: GRAY }} />
        </>
      ) : result ? (
        <>
          <StatsText>correct</StatsText>
          <CheckCircleFilled style={{ color: SEA_FOAM }} />
        </>
      ) : (
        <>
          <StatsText>incorrect</StatsText>
          <CloseCircleFilled style={{ color: CORAL }} />
        </>
      )}
    </StatsIconContainer>
  );
};

const WordResultDiv = ({ word }: { word: WordResult }) => {
  return (
    <WordResultWrapper>
      <StatTitle>{word.word}</StatTitle>
      <WordStatsContainer>
        <StatsDiv color={"transparent"}>
          <WordResultText>assessments</WordResultText>
          <StatsResultIcon result={word.assessmentCorrect} />
        </StatsDiv>
        <StatsDiv color={"#fff"}>
          <WordResultText>
            interventions: example vs. non-example
          </WordResultText>
          <StatsResultIcon result={word.activity2Correct} />
        </StatsDiv>
        <StatsDiv color={"transparent"}>
          <WordResultText>
            interventions: yes or no context question 1
          </WordResultText>
          <StatsResultIcon result={word.activity3Correct} />
        </StatsDiv>
        <StatsDiv color={"#fff"}>
          <WordResultText>
            interventions: yes or no context question 2
          </WordResultText>
          <StatsResultIcon result={word.activity3Part2Correct} />
        </StatsDiv>
        <StatsDiv color={"transparent"}>
          <WordResultText>
            interventions: yes or no context question 3
          </WordResultText>
          <StatsResultIcon result={word.activity3Part3Correct} />
        </StatsDiv>
      </WordStatsContainer>
    </WordResultWrapper>
  );
};

const SessionDashboard: FunctionComponent<SessionDashboardParams> = ({
  userSessionData,
  userName,
}) => {
  const history = useHistory();
  const wordResults = userSessionData.wordResults;
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
          {"< back to " + userName + "'s data"}
        </DashboardRedirect>
        <SessionTitle>
          session {userSessionData.sessionId + 1}
        </SessionTitle>
      </SessionHeader>
      <SessionBody>
        <WordContainer>
          <WordResultsContainer>
            {wordResults.length === 0 ? (
              <StatTitle> No Data </StatTitle>
            ) : (
              wordResults.map((wordResult) => {
                return <WordResultDiv word={wordResult} />;
              })
            )}
          </WordResultsContainer>
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
