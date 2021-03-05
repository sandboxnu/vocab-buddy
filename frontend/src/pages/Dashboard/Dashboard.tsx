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

const SignOutButton = styled.button`
  position: absolute;
  bottom: 0px;

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

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  padding-top: 98px;

  @media (max-width: 600px) {
    flex-direction: column;
    padding-right: 0px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  min-width: 309px;
  border-radius: 0px 12px 0px 0px;

  padding: 64px 64px 64px 64px;

  background: ${CLOUD};

  @media (max-width: 600px) {
    width: 100%;
    min-height: 347px;
    border-radius: 0px 0px 0px 0px;
    padding: 48px 24px 24px 24px;
  }
`;

// HELP
// Thinking of making a 2-column grid with the left-hand column being fixed-width for icons
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

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const ProfilePicture = styled.img`
  margin-bottom: 24px;

  height: 183px;
  width: 183px;

  @media (max-width: 600px) {
    font-size: 30px;
    height: 148px;
    width: 148px;
  }
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 48%;
  min-height: 100%;
  padding-left: 64px;
  padding-top: 64px;
  padding-bottom: 64px;

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

const WeekProgressContainer = styled.div`
  width: 36%;
  min-height: 100%;

  padding-left: 64px;
  padding-right: 64px;
  padding-top: 64px;

  @media (max-width: 600px) {
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

  flex: none;
  order: 0;
  flex-grow: 1;

  max-width: calc(50% - 16px);
  margin-bottom: 32px;

  background: ${CLOUD};
  border-radius: 12px;

  @media (max-width: 600px) {
    max-width: calc(50% - 12px);
    margin-bottom: 24px;
  }
`;

const ProgressStatNumber = styled.p`
  font-family: "Rubik";
  font-size: 56px;
  font-weight: 700;
  text-transform: lowercase;
  color: ${INK};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;

  @media (max-width: 600px) {
    font-size: 36px;
  }
`;

const ProgressStatDescription = styled.p`
  text-transform: lowercase;
  font-family: Open Sans;
  font-size: 18px;
  font-weight: 400;
  text-transform: lowercase;
  word-wrap: break-word;
  text-align: center;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const WeekContainer = styled.div`
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 32px 0px;
  background: ${CLOUD};
  border-radius: 12px;
  width: 100%
  height: 18.5%;
  padding-top: 32px;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 30px;
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
            <ProfilePicture
              src={
                "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/dajin.png?alt=media&token=933c72b9-afaf-407b-b978-bfd2c3b4e155"
              }
            />
            <TitleText>hi name!</TitleText>
            <MenuButtonContainer></MenuButtonContainer>

            {screenWidth > 600 && (
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
              <p>stars!</p>
            </WeekContainer>

            <TitleText>your progress</TitleText>
            <ProgressStatsContainer>
              <ProgressBox>
                <ProgressStatNumber>14</ProgressStatNumber>
                <ProgressStatDescription>
                  day streak
                </ProgressStatDescription>
              </ProgressBox>

              <ProgressBox>
                <ProgressStatNumber>25</ProgressStatNumber>
                <ProgressStatDescription>
                  words learned
                </ProgressStatDescription>
              </ProgressBox>

              <ProgressBox>
                <ProgressStatNumber>4</ProgressStatNumber>
                <ProgressStatDescription>
                  assessments completed
                </ProgressStatDescription>
              </ProgressBox>

              <ProgressBox>
                <ProgressStatNumber>3</ProgressStatNumber>
                <ProgressStatDescription>
                  interventions completed
                </ProgressStatDescription>
              </ProgressBox>
            </ProgressStatsContainer>
          </WeekProgressContainer>
        </DashboardContainer>
      </>
    </Layout>
  );
};

export default connector(Dashboard);
