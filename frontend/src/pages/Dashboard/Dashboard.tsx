import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { SessionStats, User } from "../../models/types";
import { CLOUD, INK } from "../../constants/colors";
import {
  GetData,
  GetDataForResearchers,
  GetDataForResearchersRequestProps,
  GetDataRequestProps,
  GetUserSessionDataRequestProps,
  GetUserSessionData,
  SignOut,
  ChangeProfileIcon,
  DownloadData,
} from "./data/actions";
import {
  getCurrentUser,
  getDataForResearchers,
  getDownloadDataLoading,
  getIsSignedOut,
  getTotalWordsLearned,
  getDashboardError,
  getCurrentStudentData,
  getCurrentStudentTotalWordsLearned,
  getSessionStats,
} from "./data/reducer";
import ResearcherDashboard from "../Dashboard/ResearcherDashboard";
import StudentDashboard from "../Dashboard/StudentDashboard";
import overviewIcon from "../../assets/icons/dashboard-menu/overview.svg";
import reviewWordsIcon from "../../assets/icons/dashboard-menu/review.svg";
import settingsIcon from "../../assets/icons/dashboard-menu/settings.svg";
import caret from "../../assets/caret.svg";
import ProfileEditModal from "../../components/ProfileEditModal";
import SessionDashboard from "./SessionDashboard";
import LoadingScreen from "../Loading/LoadingScreen";

interface DashboardParams {
  isSignedOut: boolean;
  currentUser?: User;
  totalWordsLearned?: number;
  dataForResearchers?: User[];
  userSessionData?: SessionStats;
  getUserSessionData: (val: GetUserSessionDataRequestProps) => void;
  signOut: () => void;
  getUser: (val: GetDataRequestProps) => void;
  getDataForResearchers: (
    val: GetDataForResearchersRequestProps
  ) => void;
  changeIconRequest: (url: string) => void;
  error?: Error;
  requestedStudent?: User;
  requestedStudentTotalWordsLearned?: number;
  downloadData: (studentId: string, userId: string) => void;
  downloadDataLoading: boolean;
}

interface IndividualDashboardParams {
  id?: string;
}

interface SessionDashboardParams {
  userId?: string;
  sessionId?: string;
}

const connector = connect(
  (state) => ({
    isSignedOut: getIsSignedOut(state),
    currentUser: getCurrentUser(state),
    dataForResearchers: getDataForResearchers(state),
    totalWordsLearned: getTotalWordsLearned(state),
    error: getDashboardError(state),
    requestedStudent: getCurrentStudentData(state),
    userSessionData: getSessionStats(state),
    requestedStudentTotalWordsLearned: getCurrentStudentTotalWordsLearned(
      state
    ),
    downloadDataLoading: getDownloadDataLoading(state),
  }),
  {
    signOut: SignOut.request,
    getUser: GetData.request,
    getDataForResearchers: GetDataForResearchers.request,
    changeIconRequest: ChangeProfileIcon.request,
    getUserSessionData: GetUserSessionData.request,
    downloadData: DownloadData.request,
  }
);

const SignOutButton = styled.button`
  background-color: #fff0;
  border-width: 0px;
  color: ${INK};
  font-weight: bold;
  margin-bottom: 20px;

  grid-area: signout;

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }

  @media (max-width: 900px) {
    margin: 0;
    padding: 0;
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
  position: sticky;
  top: 70px;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  border-radius: 0px 12px 0px 0px;
  z-index: 100;
  min-height: calc(100vh - 70px);

  padding-top: 3vh;
  padding-left: 1vh;
  padding-right: 1vh;

  background: ${CLOUD};

  @media (max-width: 900px) {
    position: relative;
    top: 0;
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
  justify-items: start;

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
      "icon3 button3 ."
      ". signout .";
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

interface MenuButtonPanelProps {
  isDropdown: boolean;
  signOutHandler: () => void;
}

interface MenuDropdownCaretProps {
  rotationDegrees: number;
}
const MenuDropdownButton = styled.img`
  grid-area: dropdown;
  width: 18px;
  height: 18px;

  transition: all 0.4s ease;
  transform: rotate(
    ${({ rotationDegrees }: MenuDropdownCaretProps) =>
      rotationDegrees}deg
  );

  :hover {
    cursor: pointer;
  }
`;

const getButtonGridArea = (
  selectedMenuButton: number,
  menuButtonNumber: number,
  menuOpen: boolean,
  isDropdown: boolean,
  type: "icon" | "button"
) => {
  if (isDropdown && !menuOpen) {
    if (selectedMenuButton === menuButtonNumber) {
      // First row
      return type + "1";
    } else {
      // put it out of place
      return type + 3;
    }
  }
  // Default
  return type + menuButtonNumber;
};

const MenuButtonPanel: FunctionComponent<MenuButtonPanelProps> = ({
  isDropdown,
  signOutHandler,
}) => {
  const [selectedMenuButton, setSelectedMenuButton] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const overviewButton = (
    <>
      <MenuButtonIcon
        gridArea={getButtonGridArea(
          selectedMenuButton,
          1,
          menuOpen,
          isDropdown,
          "icon"
        )}
        src={overviewIcon}
      />
      <MenuButtonText
        gridArea={getButtonGridArea(
          selectedMenuButton,
          1,
          menuOpen,
          isDropdown,
          "button"
        )}
        selected={selectedMenuButton === 1}
        onClick={() => {
          setSelectedMenuButton(1);
          setMenuOpen(
            !menuOpen && selectedMenuButton === 1 ? true : menuOpen
          );
        }}
      >
        overview
      </MenuButtonText>
    </>
  );
  const reviewButton = (
    <>
      <MenuButtonIcon
        gridArea={getButtonGridArea(
          selectedMenuButton,
          2,
          menuOpen,
          isDropdown,
          "icon"
        )}
        src={reviewWordsIcon}
      />
      <MenuButtonText
        gridArea={getButtonGridArea(
          selectedMenuButton,
          2,
          menuOpen,
          isDropdown,
          "button"
        )}
        selected={selectedMenuButton === 2}
        onClick={() => {
          setSelectedMenuButton(2);
          setMenuOpen(
            !menuOpen && selectedMenuButton === 2 ? true : menuOpen
          );
        }}
      >
        review words
      </MenuButtonText>
    </>
  );

  const settingsButton = (
    <>
      <MenuButtonIcon
        gridArea={getButtonGridArea(
          selectedMenuButton,
          3,
          menuOpen,
          isDropdown,
          "icon"
        )}
        src={settingsIcon}
      />
      <MenuButtonText
        gridArea={getButtonGridArea(
          selectedMenuButton,
          3,
          menuOpen,
          isDropdown,
          "button"
        )}
        selected={selectedMenuButton === 3}
        onClick={() => {
          setSelectedMenuButton(3);
          setMenuOpen(
            !menuOpen && selectedMenuButton === 3 ? true : menuOpen
          );
        }}
      >
        settings
      </MenuButtonText>
    </>
  );

  const buttons = [overviewButton, reviewButton, settingsButton];

  return (
    <MenuButtonContainer>
      {!isDropdown && overviewButton}

      {isDropdown ? (
        <>
          {menuOpen ? (
            <>
              {overviewButton}
              {reviewButton}
              {settingsButton}
              <SignOutButton onClick={signOutHandler}>
                log out
              </SignOutButton>
            </>
          ) : (
            <> {buttons[selectedMenuButton - 1]}</>
          )}
          <MenuDropdownButton
            src={caret}
            onClick={() => setMenuOpen(!menuOpen)}
            rotationDegrees={menuOpen ? 180 : 0}
          />
        </>
      ) : (
        <>
          {reviewButton}
          {settingsButton}
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
  userSessionData,
  getUserSessionData,
  dataForResearchers,
  getDataForResearchers,
  error,
  changeIconRequest,
  requestedStudent,
  requestedStudentTotalWordsLearned,
  downloadData,
  downloadDataLoading,
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
  let params = useParams<IndividualDashboardParams>();
  let sessionParams = useParams<SessionDashboardParams>();

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

  useEffect(() => {
    if (
      (params.id &&
        (!requestedStudent ||
          requestedStudent.id !==
            (params.id || sessionParams.userId) ||
          requestedStudentTotalWordsLearned === undefined)) ||
      (sessionParams.userId && !requestedStudent)
    ) {
      getUser({ id: params.id ?? sessionParams.userId });
    }
  }, [
    params.id,
    getUser,
    requestedStudent,
    requestedStudentTotalWordsLearned,
    sessionParams.userId,
  ]);

  useEffect(() => {
    if (
      sessionParams.userId &&
      sessionParams.sessionId &&
      (!userSessionData ||
        userSessionData.userId !== sessionParams.userId ||
        userSessionData.sessionId !== +sessionParams.sessionId)
    ) {
      getUserSessionData({
        userId: sessionParams.userId,
        sessionId: +sessionParams.sessionId,
      });
    }
  }, [
    sessionParams.userId,
    sessionParams.sessionId,
    getUserSessionData,
    userSessionData,
  ]);

  // Shows a loading screen if the current user and session doesn't exist
  if (
    sessionParams.userId &&
    sessionParams.sessionId &&
    (!userSessionData ||
      userSessionData.userId !== sessionParams.userId ||
      userSessionData.sessionId !== +sessionParams.sessionId)
  ) {
    return <LoadingScreen />;
  }

  // Shows a loading screen if the current user doesn't exist
  if (!currentUser || totalWordsLearned === undefined) {
    return <LoadingScreen />;
  }

  // Shows a loading screen if a requested student doesn't exist
  if (
    (params.id || sessionParams.userId) &&
    (!requestedStudent ||
      requestedStudent.id !== (params.id || sessionParams.userId) ||
      requestedStudentTotalWordsLearned === undefined)
  ) {
    return <LoadingScreen />;
  }

  if (
    (params.id || sessionParams.userId || sessionParams.sessionId) &&
    currentUser.accountType === "STUDENT"
  ) {
    history.push("/error");
  }

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
              <MenuButtonPanel
                isDropdown={screenWidth < 900}
                signOutHandler={signOut}
              />
            </MenuTopDiv>
            {screenWidth > 900 && (
              <SignOutButton onClick={signOut}>log out</SignOutButton>
            )}
          </MenuContainer>
          {currentUser.accountType === "STUDENT" ? (
            <StudentDashboard
              isStudentView={true}
              student={currentUser}
              totalWordsLearned={totalWordsLearned}
            />
          ) : params.id &&
            requestedStudent &&
            requestedStudentTotalWordsLearned !== undefined ? (
            <StudentDashboard
              student={requestedStudent}
              isStudentView={false}
              totalWordsLearned={requestedStudentTotalWordsLearned}
              downloadData={downloadData}
              downloadDataLoading={downloadDataLoading}
            />
          ) : userSessionData !== undefined &&
            requestedStudent &&
            sessionParams.userId &&
            sessionParams.sessionId ? (
            <SessionDashboard
              userSessionData={userSessionData}
              userName={requestedStudent.name}
            />
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
