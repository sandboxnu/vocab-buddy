import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import CloudGroup from "../../components/CloudGroup";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";
import { INK } from "../../constants/colors";
import { SignOut } from "../Dashboard/data/actions";
import { getIsSignedOut } from "../Dashboard/data/reducer";

const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  padding: 20px;
`;

const SignOutButton = styled.button`
  background-color: #fff0;
  border-width: 0px;
  color: ${INK};
  font-weight: bold;
  text-align: left;
  z-index: 100;

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }
`;

const WrappingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopImage = styled.img`
  max-width: 80vw;
`;

interface ErrorScreenProps {
  logOut: () => void;
  signedOut: boolean;
}

const connector = connect(
  (state) => ({
    signedOut: getIsSignedOut(state),
  }),
  {
    logOut: SignOut.request,
  }
);

function ErrorScreen({ logOut, signedOut }: ErrorScreenProps) {
  let history = useHistory();

  if (signedOut) {
    history.push("/login");
  }

  return (
    <Layout>
      <>
        <CloudGroup />
        <WrappingDiv>
          <TopImage src="https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Ferrorscreen_illustration.svg?alt=media&token=601b55ee-6869-4d1b-b808-032d5902a8e6" />
          <TitleText>oops, something went wrong</TitleText>
          <PurpleButton
            text="return to dashboard"
            onClick={() => history.push("/dashboard")}
          />
          <SignOutButton onClick={logOut}>log out</SignOutButton>
        </WrappingDiv>
      </>
    </Layout>
  );
}

export default connector(ErrorScreen);
