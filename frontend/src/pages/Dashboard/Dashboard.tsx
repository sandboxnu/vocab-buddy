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
import {
  CLOUD,
  INK,
  SKY,
  INCOMPLETE_GRAY,
} from "../../constants/colors";
import PurpleButton from "../../components/PurpleButton";
import { User } from "../../models/types";
import {
  GetData,
  GetDataForResearchers,
  GetDataForResearchersRequestProps,
  GetDataRequestProps,
  SignOut,
  ChangeProfileIcon,
} from "./data/actions";
import {
  getCurrentUser,
  getDataForResearchers,
  getIsSignedOut,
  getTotalWordsLearned,
  getDashboardError,
} from "./data/reducer";
import ResearcherDashboard from "../Dashboard/ResearcherDashboard";
import star from "../../assets/star.svg";
import ellipse from "../../assets/ellipse.svg";
import overviewIcon from "../../assets/icons/dashboard-menu/overview.svg";
import reviewWordsIcon from "../../assets/icons/dashboard-menu/review.svg";
import settingsIcon from "../../assets/icons/dashboard-menu/settings.svg";
import ColoredSessionIcons from "../../assets/icons/session/color/ColoredSessionIcons";
import GrayscaleSessionIcons from "../../assets/icons/session/grayscale/GrayscaleSessionIcons";
import { dayStreak } from "../../constants/utils";
import ProfileEditModal from "../../components/ProfileEditModal";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

interface DashboardParams {
  isSignedOut: boolean;
  currentUser?: User;
  totalWordsLearned?: number;
  dataForResearchers?: User[];
  signOut: () => void;
  getUser: (val: GetDataRequestProps) => void;
  getDataForResearchers: (
    val: GetDataForResearchersRequestProps
  ) => void;
  changeIconRequest: (url: string) => void;
  error?: Error;
}

const connector = connect(
  (state) => ({
    isSignedOut: getIsSignedOut(state),
    currentUser: getCurrentUser(state),
    dataForResearchers: getDataForResearchers(state),
    totalWordsLearned: getTotalWordsLearned(state),
    error: getDashboardError(state),
  }),
  {
    signOut: SignOut.request,
    getUser: GetData.request,
    getDataForResearchers: GetDataForResearchers.request,
    changeIconRequest: ChangeProfileIcon.request,
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
  align-items: stretch;
  width: 100%;
  padding-top: 70px;
  min-height: 100vh;

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

  padding-top: 3vh;
  padding-left: 1vh;
  padding-right: 1vh;

  background: ${CLOUD};

  @media (max-width: 900px) {
    width: 100%;
    min-height: 347px;
    border-radius: 0px 0px 0px 0px;
    padding: 48px 24px 24px 24px;
  }
`;

const MenuButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  grid-template-rows: auto;

  gap: 1vh;

  margin-top: 16px;
  text-align: left;

  grid-template-areas:
    "icon1 button1"
    "icon2 button2"
    "icon3 button3";

  @media (max-width: 900px) {
    width: 90vw;
    grid-template-columns: 18px 1fr 18px;
    grid-template-rows: auto;

    grid-template-areas:
      "icon1 button1 dropdown"
      "icon2 button2 ."
      "icon3 button3 .";
  }
`;

const MenuButtonIcon = styled.img`
  height: 18px;
  width: 18px;
  grid-area: ${({ gridArea }: MenuGridProps) => gridArea};

  :hover {
    cursor: pointer;
  }
`;

interface MenuGridProps {
  gridArea: string;
}

interface MenuButtonProps extends MenuGridProps {
  selected: boolean;
}

const MenuButtonText = styled.p`
  font-weight: ${({ selected }: MenuButtonProps) =>
    selected ? `700` : "400"};

  grid-area: ${({ gridArea }: MenuButtonProps) => gridArea};

  :hover {
    cursor: pointer;
  }
`;

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

const MenuTopDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const ProfilePicture = styled.img`
  height: 9vmax;
  width: 9vmax;

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
  font-size: 1.5vw;
  text-align: center;
  white-space: nowrap;
  margin-bottom: 0;

  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;

const SessionImage = styled.img`
  max-width: 60%;
  margin-bottom: 2vh;
  @media (max-width: 900px) {
    margin-bottom: 22px;
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
  height: 51px;
  width: 52px;

  @media (max-width: 900px) {
    height: 35px;
    width: 36px;
  }
`;

const DotContainer = styled.div`
  height: 51px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    height: 35px;
    width: 36px;
  }
`;
const Dot = styled.img`
  height: 12px;
  width: 12px;

  @media (max-width: 900px) {
    height: 10px;
    width: 10px;
  }
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

const ProfileGroup = styled.button`
  border: None;
  border-radius: 50%;
  margin-bottom: 1em;
  padding: 0;
  position: relative;

  :hover {
    cursor: pointer;
  }
`;

const EditContainer = styled.div`
  align-items: center;
  display: flex;
  border-radius: 50%;
  background-color: rgba(32, 33, 36, 0.6);
  bottom: 0;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  :hover {
    opacity: 1;
  }
`;

const EditText = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
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

interface MenuButtonPanelProps {
  isDropdown: boolean;
}

const MenuDropdownButton = styled.img`
  grid-area: dropdown;
  width: 18px;
  height: 18px;

  :hover {
    cursor: pointer;
  }
`;

const MenuButtonPanel: FunctionComponent<MenuButtonPanelProps> = ({
  isDropdown,
}) => {
  const [selectedMenuButton, setSelectedMenuButton] = useState(1);
  const [menuOpen, setMenuOpen] = useState(!isDropdown);

  return (
    <MenuButtonContainer>
      <MenuButtonIcon gridArea={"icon1"} src={overviewIcon} />
      <MenuButtonText
        gridArea={"button1"}
        selected={selectedMenuButton === 1}
        onClick={() => setSelectedMenuButton(1)}
      >
        overview
      </MenuButtonText>

      {isDropdown && (
        <MenuDropdownButton
          src={star}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}

      {menuOpen && (
        <>
          <MenuButtonIcon gridArea={"icon2"} src={reviewWordsIcon} />
          <MenuButtonText
            gridArea={"button2"}
            selected={selectedMenuButton === 2}
            onClick={() => setSelectedMenuButton(2)}
          >
            review words
          </MenuButtonText>
          <MenuButtonIcon gridArea={"icon3"} src={settingsIcon} />
          <MenuButtonText
            gridArea={"button3"}
            selected={selectedMenuButton === 3}
            onClick={() => setSelectedMenuButton(3)}
          >
            settings
          </MenuButtonText>
        </>
      )}
    </MenuButtonContainer>
  );
};

const Dashboard: FunctionComponent<DashboardParams> = ({
  isSignedOut,
  signOut,
  currentUser,
  totalWordsLearned,
  getUser,
  dataForResearchers,
  getDataForResearchers,
  error,
  changeIconRequest,
}): ReactElement => {
  let history = useHistory();
  if (isSignedOut) {
    history.push("/login");
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);

  const [
    hasPerformedNetworkRequest,
    setHasPerformedNetworkRequest,
  ] = useState(false);
  const dayLabels = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const sessionNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

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
    if (!currentUser || totalWordsLearned === undefined) {
      getUser({});
      setHasPerformedNetworkRequest(true);
    }
  }, [currentUser, getUser, totalWordsLearned]);

  if (error && hasPerformedNetworkRequest) {
    history.push("/error");
  }

  useEffect(() => {
    if (
      !dataForResearchers &&
      currentUser &&
      currentUser.accountType === "RESEARCHER"
    ) {
      getDataForResearchers({});
    }
  }, [
    currentUser,
    getUser,
    dataForResearchers,
    getDataForResearchers,
  ]);

  if (!currentUser || totalWordsLearned === undefined) {
    return <h1>Loading</h1>;
  }

  const daysActiveThisWeek = currentUser.daysActive.filter((day) =>
    filterByThisWeek(day)
  );

  return (
    <Layout shouldAddPadding={false}>
      <>
        <DashboardContainer>
          <MenuContainer>
            <MenuTopDiv>
              <ProfileGroup>
                <ProfilePicture src={currentUser.profileIcon} />
                <EditContainer onClick={() => setShowModal(true)}>
                  <EditText>edit</EditText>
                </EditContainer>
                <ProfileEditModal
                  currentIcon={currentUser.profileIcon}
                  showModal={showModal}
                  onClose={() => setShowModal(false)}
                  changeIconRequest={changeIconRequest}
                />
              </ProfileGroup>
              <TitleText>hi {currentUser.name}!</TitleText>
              <MenuButtonPanel isDropdown={screenWidth < 900} />
            </MenuTopDiv>
            {screenWidth > 900 && (
              <SignOutButton onClick={signOut}>log out</SignOutButton>
            )}
          </MenuContainer>
          {currentUser.accountType === "STUDENT" ? (
            <>
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

                <SessionCardContainer>
                  {sessionNumbers.map(
                    (label: number, index: number) => {
                      let complete =
                        currentUser?.sessionId >= label ||
                        label === 1;
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
                    }
                  )}
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

                <TitleText>your progress</TitleText>
                <ProgressStatsContainer>
                  <Stat
                    number={dayStreak(
                      currentUser.daysActive.map(
                        (val) => new Date(val)
                      )
                    )}
                    description={"day streak"}
                  />
                  <Stat
                    number={totalWordsLearned}
                    description={"words learned"}
                  />
                  <Stat
                    number={currentUser.sessionId + 1}
                    description={"assessments completed"}
                  />
                  <Stat
                    number={
                      currentUser.sessionId +
                      (currentUser.onAssessment ? 1 : 0)
                    }
                    description={"interventions completed"}
                  />
                </ProgressStatsContainer>
              </WeekProgressContainer>
            </>
          ) : (
            <ResearcherDashboard
              students={dataForResearchers || []}
            ></ResearcherDashboard>
          )}
        </DashboardContainer>
      </>
    </Layout>
  );
};

export default connector(Dashboard);
