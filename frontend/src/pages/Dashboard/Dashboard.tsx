import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { SignOut } from "./data/actions";
import { getIsSignedOut } from "./data/reducer";
import { CLOUD } from "../../constants/colors";

const SignOutButton = styled.button``;

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
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const NameText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: lowercase;
  word-wrap: break-word;

  text-align: center;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const ProfilePicture = styled.img`
  margin-bottom: 24px;
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
            <NameText>hi name!</NameText>
            <SignOutButton onClick={signOut}>sign out</SignOutButton>
          </MenuContainer>
        </DashboardContainer>
      </>
    </Layout>
  );
};

export default connector(Dashboard);
