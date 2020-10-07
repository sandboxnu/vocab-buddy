import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { TextInput } from "../components/TextInput";
import { INK, LOGIN_BACKGROUND } from "../constants/colors";
import { authenticationRequest, singleRequest } from "../data/actions";

const CreateUserButton = styled.button`
  flex: 1;
  margin: 5px 0px;
  background-color: #fff0;
  border-width: 0px;
  text-align: left;
  color: ${INK};
`;

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  @media (max-width: 600px) {
    flex: 2;
    justify-content: flex-start;
  }

  @media (min-width: 601px) {
    flex: 1;
    justify-content: center;
  }
`;

const LoginSwitchingDiv = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }

  @media (min-width: 601px) {
    flex-direction: row;
  }
`;

const ActuallyLoginDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginInfoDiv = styled.div`
  flex: 1;
  background: ${LOGIN_BACKGROUND};
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoginHeader = styled.h1``;

const EvenSpacedDiv = styled.div`
  @media (max-width: 600px) {
    flex: 0;
  }

  @media (min-width: 601px) {
    flex: 1;
  }
`;

const LoginButton = styled.button`
  background-color: ${INK};
  border-radius: 12px;
  color: #fff;
  border-width: 0px;
  flex: 1;
  margin: 5px 0px 15px 0px;
  padding: 15px;
`;
// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  signIn: authenticationRequest.signIn,
});

const Login = ({ signedIn, signIn }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (signedIn) {
      history.push("/dashboard");
    }
  }, [signedIn, history]);

  return (
    <Layout>
      <LoginSwitchingDiv>
        <LoginHoldingDiv>
          <HorizontalDiv>
            <EvenSpacedDiv />
            <ActuallyLoginDiv>
              <LoginHeader>login</LoginHeader>
              <TextInput
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                text="email address"
              />
              <TextInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                text="password"
              />

              <LoginButton onClick={() => signIn({ email, password })}>
                login
              </LoginButton>

              <CreateUserButton onClick={() => history.push("/sign_up")}>
                sign up
              </CreateUserButton>
            </ActuallyLoginDiv>
            <EvenSpacedDiv />
          </HorizontalDiv>
        </LoginHoldingDiv>

        <LoginInfoDiv></LoginInfoDiv>
      </LoginSwitchingDiv>
    </Layout>
  );
};

export default connector(Login);
