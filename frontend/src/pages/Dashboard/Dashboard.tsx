import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { CLOUD, INK } from "../../constants/colors";
import PurpleButton from "../../components/PurpleButton";
import { User } from "../../models/types";
import {
  GetData,
  GetDataRequestProps,
  SignOut,
} from "./data/actions";
import { getCurrentUser, getIsSignedOut } from "./data/reducer";
import star from "../../assets/star.svg";
import ellipse from "../../assets/ellipse.svg";

interface DashboardParams {
  isSignedOut: boolean;
  currentUser?: User;
  signOut: () => void;
  getUser: (val: GetDataRequestProps) => void;
}

const connector = connect(
  (state) => ({
    isSignedOut: getIsSignedOut(state),
    currentUser: getCurrentUser(state),
  }),
  {
    signOut: SignOut.request,
    getUser: GetData.request,
  }
);

const SignOutButton = styled.button`
  background-color: #fff0;
  border-width: 0px;
  color: ${INK};
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100%;
  min-width: 100%;
  padding-top: 98px;

  @media (max-width: 900px) {
    flex-direction: column;
    padding-right: 0px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100%;
  flex: 1;
  border-radius: 0px 12px 0px 0px;

  padding: 64px 64px 64px 64px;

  background: ${CLOUD};

  @media (max-width: 900px) {
    width: 100%;
    min-height: 347px;
    border-radius: 0px 0px 0px 0px;
    padding: 48px 24px 24px 24px;
  }
`;

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;

  background: red;
  width: 100%;
  height: 100px;
`;

const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const MenuTopDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicture = styled.img`
  margin-bottom: 24px;

  height: 183px;
  width: 183px;

  @media (max-width: 900px) {
    height: 148px;
    width: 148px;
  }
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 3;
  min-height: 100%;
  padding-left: 64px;
  padding-top: 64px;
  padding-bottom: 64px;

  @media (max-width: 900px) {
    min-width: 100%;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const NextSessionButton = styled(PurpleButton)`
  min-width: 32%;
  height: 100px;
  margin-bottom: 64px;
  text-transform: lowercase;

  @media (max-width: 900px) {
    min-width: 100%;
  }
`;

const WeekProgressContainer = styled.div`
  flex: 2;
  min-height: 100%;

  padding-left: 64px;
  padding-right: 64px;
  padding-top: 64px;

  @media (max-width: 900px) {
    min-width: 100%;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const ProgressStatsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 30px 30px;

  flex: 1 0 50%;
  order: 0;
  flex-grow: 1;

  max-width: calc(50% - 16px);
  margin-bottom: 32px;

  background: ${CLOUD};
  border-radius: 12px;

  @media (max-width: 900px) {
    max-width: calc(50% - 12px);
    margin-bottom: 24px;
  }
`;

const ProgressStatNumber = styled.p`
  font-family: "Rubik";
  font-size: 4vw;
  font-weight: 700;
  text-transform: lowercase;
  color: ${INK};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;

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

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;

  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;

const DayLabel = styled.p<DayLabelType>`
  font-weight: ${(props) => (props.isToday ? 700 : 400)};
  line-height: 0px;
`;

const Star = styled.img`
  height: 51px;
  width: 52px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    height: 35px;
    width: 36px;
  }
`;
const Dot = styled.img`
  height: 12px;
  width: 12px;
  margin: 18px 20px 38px 20px;

  @media (max-width: 900px) {
    height: 10px;
    width: 10px;
    margin: 12px 20px 32px 20px;
  }
`;

const WeekContainer = styled.div`
  flex: none;
  order: 1;
  flex-grow: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32px;
  margin: 32px 0px 64px;
  background: ${CLOUD};
  border-radius: 12px;
  width: 100%
  height: 18.5%;
  
  @media (max-width: 900px) [
    margin: 24px 0px 48px;
  ]
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const isDayActive = (dayNumber: number, user: User): boolean => {
  let daysActive = user.daysActive;
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
  currentUser: User;
}

interface DayLabelType {
  isToday?: boolean;
}
const DayOfWeek: FunctionComponent<DayParams> = ({
  name,
  day,
  currentUser,
}) => {
  let istoday = isToday(day);
  let isActive = isDayActive(day, currentUser);
  return (
    <DayContainer>
      {isActive ? (
        <Star src={star}></Star>
      ) : (
        <Dot src={ellipse}></Dot>
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

const Dashboard: FunctionComponent<DashboardParams> = ({
  isSignedOut,
  signOut,
  currentUser,
  getUser,
}): ReactElement => {
  let history = useHistory();
  if (isSignedOut) {
    history.push("/login");
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dayLabels = ["su", "mo", "tu", "we", "th", "fr", "sa", "su"];

  useEffect(() => {
    const resizeScreen = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      getUser({});
    }
  }, [currentUser, getUser]);

  if (!currentUser) {
    return <h1>Loading</h1>;
  }

  return (
    <Layout shouldAddPadding={false}>
      <>
        <DashboardContainer>
          <MenuContainer>
            <MenuTopDiv>
              <ProfilePicture
                src={
                  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/dajin.png?alt=media&token=933c72b9-afaf-407b-b978-bfd2c3b4e155"
                }
              />
              <TitleText>hi name!</TitleText>
              <MenuButtonContainer></MenuButtonContainer>
            </MenuTopDiv>
            {screenWidth > 900 && (
              <SignOutButton onClick={signOut}>log out</SignOutButton>
            )}
          </MenuContainer>

          <SessionContainer>
            <TitleText>next session</TitleText>
            <NextSessionButton
              text={getTitleOfButton(currentUser)}
              onClick={() =>
                history.push(
                  currentUser.onAssessment
                    ? "/assessments"
                    : "/interventions"
                )
              }
              disabled={currentUser.sessionId === 9}
            />

            <TitleText>list of sessions</TitleText>
          </SessionContainer>

          <WeekProgressContainer>
            <TitleText>this week</TitleText>
            <WeekContainer>
              {dayLabels.map((label: string, index: number) => {
                return (
                  <DayOfWeek
                    name={label}
                    day={index}
                    currentUser={currentUser}
                  ></DayOfWeek>
                );
              })}
            </WeekContainer>

            <TitleText>your progress</TitleText>
            <ProgressStatsContainer>
              <Stat number={14} description={"day streak"} />
              <Stat number={25} description={"words learned"} />
              <Stat
                number={4}
                description={"assessments completed"}
              />
              <Stat
                number={3}
                description={"interventions completed"}
              />
            </ProgressStatsContainer>
          </WeekProgressContainer>
        </DashboardContainer>
      </>
    </Layout>
  );
};

export default connector(Dashboard);
