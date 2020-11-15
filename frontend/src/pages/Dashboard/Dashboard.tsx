import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { SignOut } from "./data/actions";
import { getIsSignedOut } from "./data/reducer";

const SignOutButton = styled.button``;

interface DashboardParams {
  isSignedOut: boolean,
  signOut: () => void
}

const connector = connect(state => ({
  isSignedOut: getIsSignedOut(state)
}), {
  signOut: SignOut.request
})

const Dashboard : FunctionComponent<DashboardParams> = ({ isSignedOut, signOut }) : ReactElement => {
  let history = useHistory();
  if (isSignedOut) {
    history.push("/login");
  }
  return (<Layout>
    <>
      Dashboard
      <SignOutButton onClick={signOut}>sign out</SignOutButton>
    </>
    </Layout>);
};

export default connector(Dashboard);
