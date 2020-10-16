import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Layout from "../components/Layout";
import PurpleButton from "../components/PurpleButton";
import { TextInput } from "../components/TextInput";
import { INK, LOGIN_BACKGROUND } from "../constants/colors";
import { authenticationRequest, singleRequest } from "../data/actions";
import { getSignedIn } from "../data/reducer";
import { LoginParams, ResetPasswordParams } from "../models/types";

const ResetUserButton = styled.button`
  padding-left: 0;
  background-color: #fff0;
  border-width: 0px;
  text-align: left;
  color: ${INK};
`;

const CreateUserButton = styled(ResetUserButton)`
  padding-left: 5px;
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
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 7em 0em 7em 0em
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
  @media (max-width: 600px) {
    padding: 1em 2.5em 0em 2.5em
  }
`;

const LoginInfoDiv = styled.div`
  flex: 1;
  background: ${LOGIN_BACKGROUND};
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }

  @media (min-width: 601px) {
    min-height: 100%;
  }
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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


const LoginImage = styled.img`
  flex: 5;
  @media (max-width: 600px) {
    flex: 0;
    margin: auto;
    width: 80vw;
  }

  @media (min-width: 601px) {
    margin: auto;
    width: 40vw;
  }
`;


// An example of using a connector
const connector = connect((state) => ({
  signedIn: getSignedIn(state),
}), {
  request: singleRequest.request,
  signIn: authenticationRequest.signIn,
  resetPassword: authenticationRequest.resetPassword,
});

const loginIllustration = 'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/login_illustration.png?alt=media&token=1a270ca5-e24b-4327-83af-89972e0e112e';

interface LoginProps {
  signedIn : boolean;
  signIn : ({email, password} : LoginParams) => void;
  resetPassword : ({email} : ResetPasswordParams) => void;
}

const Login : FunctionComponent<LoginProps> = ({ signedIn, signIn, resetPassword }) : ReactElement => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let history = useHistory();

  let doResetPassword = () => {
    let email = prompt("What is your email?");

    if (email == null || email === "") {
      return;
    }

    resetPassword({ email });
  }

  useEffect(() => {
    if (signedIn) {
      history.push("/dashboard");
    }
  }, [signedIn, history]);

  return (
    <Layout hideBar={true}>
      <LoginSwitchingDiv>
        <LoginInfoDiv>
          <EvenSpacedDiv />
          <LoginImage src={loginIllustration}/>
          <EvenSpacedDiv />
        </LoginInfoDiv>
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

              <PurpleButton
                text={"login"}
                top={0}
                onClick={() => signIn({ email, password })}
              />

              <ResetUserButton onClick={() => doResetPassword()}>
                forgot password
              </ResetUserButton>
              <HorizontalDiv>
              Don't have an account?   
              <CreateUserButton onClick={() => history.push("/sign_up")}>
                sign up
              </CreateUserButton>
              </HorizontalDiv>
            </ActuallyLoginDiv>
            <EvenSpacedDiv />
          </HorizontalDiv>
        </LoginHoldingDiv>
      </LoginSwitchingDiv>
    </Layout>
  );
};

export default connector(Login);
