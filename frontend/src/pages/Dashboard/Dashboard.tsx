import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { SignOut } from "./data/actions";
import { getIsSignedOut } from "./data/reducer";
import { CLOUD, INK } from "../../constants/colors";

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
  min-width: 864px;
  min-height: 100%;
  margin-left: 64px;
  padding-top: 64px;

  background: blue;
`;

const WeekProgressContainer = styled.div`
  min-width: 555px;
  min-height: 100%;
  margin-left: 64px;
  padding-right: 64px;
  padding-top: 64px;

  background: green;
`;

const Dashboard: FunctionComponent<DashboardParams> = ({
  isSignedOut,
  signOut,
}): ReactElement => {
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

            <SignOutButton onClick={signOut}>log out</SignOutButton>
          </MenuContainer>

          <SessionContainer>
            <TitleText>next session</TitleText>
            <p> button</p>
            <TitleText>list of sessions</TitleText>
          </SessionContainer>

          <WeekProgressContainer>
            <TitleText>this week</TitleText>
            <p>box</p>
            <TitleText>your progress</TitleText>
          </WeekProgressContainer>
        </DashboardContainer>
      </>
    </Layout>
  );
};

export default connector(Dashboard);
