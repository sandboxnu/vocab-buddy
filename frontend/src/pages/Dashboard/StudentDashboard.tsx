import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  CLOUD,
  INK,
  SKY,
  INCOMPLETE_GRAY,
} from "../../constants/colors";
import PurpleButton from "../../components/PurpleButton";
import { User } from "../../models/types";
import star from "../../assets/star.svg";
import ellipse from "../../assets/ellipse.svg";
import ColoredSessionIcons from "../../assets/icons/session/color/ColoredSessionIcons";
import GrayscaleSessionIcons from "../../assets/icons/session/grayscale/GrayscaleSessionIcons";
import { dayStreak } from "../../constants/utils";

interface StudentDashboardParams {
  student: User;
  showNextSession: boolean;
  totalWordsLearned: number;
}

const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  margin-top: 1vh;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 3;
  padding-left: 3vw;
  padding-top: 3vh;

  @media (max-width: 900px) {
    min-width: 100%;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const SessionCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-width: 100%;
  gap: 3vmin;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

interface SessionCompletionProp {
  isComplete: boolean;
}

const SessionBox = styled.div`
  padding: 2vh 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    padding: 32px;
  }

  background: ${({ isComplete }: SessionCompletionProp) =>
    isComplete ? SKY : INCOMPLETE_GRAY} !important;
`;

const SessionNumber = styled.p`
  font-weight: 700;
  font-size: 1.3vw;
  text-align: center;
  white-space: nowrap;
  margin-bottom: 0;

  @media (max-width: 900px) {
    font-size: 3.1vw;
  }
`;

const SessionImage = styled.img`
  max-width: 6vw;
  max-height: 6vh;

  margin-bottom: 2vh;
  @media (max-width: 900px) {
    margin-bottom: 22px;
    max-width: 20vw;
    max-height: 20vh;
  }
`;

const NextSessionButton = styled(PurpleButton)`
  min-width: 32%;
  height: 100px;
  margin-bottom: 4vh;
  text-transform: lowercase;

  @media (max-width: 900px) {
    min-width: 100%;
  }
`;

const WeekProgressContainer = styled.div`
  flex: 2;

  padding-left: 4vw;
  padding-right: 1vw;
  padding-top: 3vh;

  @media (max-width: 900px) {
    min-width: 100%;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const ProgressStatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3vmin;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5vh 0.5vw;

  background: ${CLOUD};
  border-radius: 12px;

  @media (max-width: 900px) {
    margin-bottom: 24px;
    padding: 2vh 0.5vw;
  }
`;

const ProgressStatNumber = styled.p`
  font-family: "Rubik";
  font-size: 3vw;
  font-weight: 700;
  text-transform: lowercase;
  color: ${INK};
  flex: 1;
  margin-bottom: 0;

  @media (max-width: 900px) {
    font-size: 6vw;
  }
`;

const ProgressStatDescription = styled.p`
  text-transform: lowercase;
  font-family: Open Sans;
  font-size: 1.25vw;
  font-weight: 400;
  text-transform: lowercase;
  word-wrap: break-word;
  text-align: center;

  flex: 1;

  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;

const DayLabel = styled.p<DayLabelType>`
  font-size: 1.25vw;
  font-weight: ${({ isToday }) => (isToday ? 700 : 400)};
  line-height: 0px;
  margin-bottom: 0;
  margin-top: 3vh;

  @media (max-width: 900px) {
    font-size: 3vw;
  }

  @media (max-width: 425px) {
    font-size: 4vw;
  }
`;

const Star = styled.img`
  height: 3.5vw;
  width: 3.5vw;

  @media (max-width: 900px) {
    height: 8vw;
    width: 8vw;
  }
`;

const DotContainer = styled.div`
  height: 3vw;
  width: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    height: 6vw;
    width: 6vw;
  }
`;

const Dot = styled.img`
  height: 20%;
  width: 20%;
`;

const WeekContainer = styled.div`
  flex: none;
  order: 1;
  flex-grow: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: ${CLOUD};
  border-radius: 12px;
  width: 100%;

  @media (max-width: 900px) {
    margin: 24px 0px 48px;
    padding: 35px 20px;
  }
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 3vh 0;
  padding-left: 0.5vh;
  padding-right: 0.5vh;
  @media (min-width: 901px) {
    margin: 1vh 0;
  }
`;

const StudentNameTitle = styled.p`
  font-family: "Rubik";
  font-size: 56px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  margin-top: 1vh;

  @media (max-width: 900px) {
    font-size: 40px;
  }
`;

const BackToDashboard = styled.p`
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

const getTitleOfButton = (user: User): string => {
  switch (user.sessionId) {
    case -1:
      return "Begin pre-assessment";
    case 9:
      return "Congratulations on finishing the study";
    default:
      return (
        (user.onAssessment ? "Continue session " : "Begin session ") +
        (user.sessionId + 1)
      );
  }
};

const filterByThisWeek = (dayString: string) => {
  let today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  let todayDayOfWeek = today.getDay();
  let day = new Date(dayString);
  let daysApart =
    (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);
  let dayOfWeek = day.getDay();
  return !(
    today !== day &&
    (dayOfWeek > todayDayOfWeek || daysApart >= 7)
  );
};

const isDayActive = (
  dayNumber: number,
  daysActive: string[]
): boolean => {
  for (let index in daysActive) {
    let dayString = daysActive[index];
    let day = new Date(dayString);
    let dayOfWeek = day.getDay();
    if (dayOfWeek === dayNumber) {
      return true;
    }
  }
  return false;
};

const isToday = (dayNumber: number): boolean => {
  let today = new Date();
  let dayOfWeek = today.getDay();
  return dayNumber === dayOfWeek;
};

interface StatParams {
  number: number;
  description: string;
}

interface DayParams {
  name: string;
  day: number;
  daysActiveThisWeek: string[];
}

interface DayLabelType {
  isToday?: boolean;
}
const DayOfWeek: FunctionComponent<DayParams> = ({
  name,
  day,
  daysActiveThisWeek,
}) => {
  let istoday = isToday(day);
  let isActive = isDayActive(day, daysActiveThisWeek);
  return (
    <DayContainer>
      {isActive ? (
        <Star src={star}></Star>
      ) : (
        <DotContainer>
          <Dot src={ellipse}></Dot>
        </DotContainer>
      )}
      <DayLabel isToday={istoday}>{name}</DayLabel>
    </DayContainer>
  );
};

const Stat: FunctionComponent<StatParams> = ({
  number,
  description,
}) => {
  return (
    <ProgressBox>
      <ProgressStatNumber>{number}</ProgressStatNumber>
      <ProgressStatDescription>{description}</ProgressStatDescription>
    </ProgressBox>
  );
};

interface SessionCardParams {
  sessionNumber: number;
  image: string;
  isComplete: boolean;
}

const SessionCard: FunctionComponent<SessionCardParams> = ({
  sessionNumber,
  image,
  isComplete,
}) => {
  return (
    <SessionBox isComplete={isComplete}>
      <SessionImage src={image} />
      <SessionNumber>session {sessionNumber}</SessionNumber>
    </SessionBox>
  );
};

const StudentDashboard: FunctionComponent<StudentDashboardParams> = ({
  student,
  showNextSession,
  totalWordsLearned,
}) => {
  const history = useHistory();
  const dayLabels = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const sessionNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const daysActiveThisWeek = student.daysActive.filter((day) =>
    filterByThisWeek(day)
  );

  return (
    <>
      <SessionContainer>
        {showNextSession ? (
          <>
            <TitleText>next session</TitleText>
            <NextSessionButton
              text={getTitleOfButton(student)}
              onClick={() =>
                history.push(
                  student.onAssessment
                    ? "/assessments"
                    : "/interventions"
                )
              }
              disabled={student.sessionId === 9}
            />
          </>
        ) : (
          <>
            <BackToDashboard
              onClick={() => history.push("/dashboard")}
            >
              {"<"} back to student selections
            </BackToDashboard>
            <StudentNameTitle>{student.name}'s Data</StudentNameTitle>
          </>
        )}

        <TitleText>list of sessions</TitleText>

        <SessionCardContainer>
          {sessionNumbers.map((label: number, index: number) => {
            let complete = student?.sessionId >= label || label === 1;
            return (
              <SessionCard
                sessionNumber={label}
                image={
                  complete
                    ? ColoredSessionIcons[index]
                    : GrayscaleSessionIcons[index]
                }
                isComplete={complete}
                key={index}
              />
            );
          })}
        </SessionCardContainer>
      </SessionContainer>

      <WeekProgressContainer>
        <TitleText>this week</TitleText>

        <WeekContainer>
          {dayLabels.map((label: string, index: number) => {
            return (
              <DayOfWeek
                key={label}
                name={label}
                day={index}
                daysActiveThisWeek={daysActiveThisWeek}
              />
            );
          })}
        </WeekContainer>

        <TitleText>
          {showNextSession
            ? "your progress"
            : `${student.name}'s progress`}
        </TitleText>
        <ProgressStatsContainer>
          <Stat
            number={dayStreak(
              student.daysActive.map((val) => new Date(val))
            )}
            description={"day streak"}
          />
          <Stat
            number={totalWordsLearned}
            description={"words learned"}
          />
          <Stat
            number={student.sessionId + 1}
            description={"assessments completed"}
          />
          <Stat
            number={
              student.sessionId + (student.onAssessment ? 1 : 0)
            }
            description={"interventions completed"}
          />
        </ProgressStatsContainer>
      </WeekProgressContainer>
    </>
  );
};

export default StudentDashboard;
