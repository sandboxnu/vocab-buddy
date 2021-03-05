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
import { SignOut } from "./data/actions";
import { getIsSignedOut } from "./data/reducer";
import { CLOUD, INK } from "../../constants/colors";
import PurpleButton from "../../components/PurpleButton";

const SignOutButton = styled.button`
  position: absolute;
  bottom: 64px;

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
  signOut: () => void;
}

const connector = connect(
  (state) => ({
    isSignedOut: getIsSignedOut(state),
  }),
  {
    signOut: SignOut.request,
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
  width: 309px;
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
  width: 300px;
  height: 100px;

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

const Dashboard: FunctionComponent<DashboardParams> = ({
  isSignedOut,
  signOut,
}): ReactElement => {
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

  let history = useHistory();
  if (isSignedOut) {
    history.push("/login");
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
              onClick={() => {}}
              text={"begin session #!"}
            />

            <TitleText>list of sessions</TitleText>
          </SessionContainer>

          <WeekProgressContainer>
            <TitleText>this week</TitleText>
            <p>box</p>
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
