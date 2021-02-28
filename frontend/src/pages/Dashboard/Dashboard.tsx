import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";
import { User } from "../../models/types";
import {
  GetData,
  GetDataRequestProps,
  SignOut,
} from "./data/actions";
import { getCurrentUser, getIsSignedOut } from "./data/reducer";

const SignOutButton = styled.button``;

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
  useEffect(() => {
    if (!currentUser) {
      getUser({});
    }
  }, [currentUser, getUser]);
  if (!currentUser) {
    return <h1>Loading</h1>;
  }
  return (
    <Layout>
      <>
        Dashboard
        <SignOutButton onClick={signOut}>sign out</SignOutButton>
        <PurpleButton
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
      </>
    </Layout>
  );
};

export default connector(Dashboard);
