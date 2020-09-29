import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { INK, LOGIN_BACKGROUND } from "../constants/colors";
import { singleRequest } from "../data/actions";

const LoginInput = styled.input`
  width: 100%;
  background-color: clear;
  border-radius: 12px;
  border: 1px solid #d4d6e2;
  padding: 10px;
`;

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
  height: 100%;
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

const InputDiv = styled.div`
  justify-content: center;
  margin: 16px 0px;
`;

const InputTitle = styled.h4``;

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
  addUser: singleRequest.addUser,
  createUser: singleRequest.createUser,
  updateEmail: singleRequest.updateEmail,
  updatePassword: singleRequest.updatePassword,
  signIn: singleRequest.signIn,
});

const Login = ({
  email,
  password,
  signedIn,
  updateEmail,
  updatePassword,
  createUser,
  signIn,
}) => {
  let history = useHistory();
  if (signedIn) {
    history.push("/dashboard");
  }
  return (
    <Layout>
      <LoginSwitchingDiv>
        <LoginHoldingDiv>
          <HorizontalDiv>
            <EvenSpacedDiv />
            <ActuallyLoginDiv>
              <LoginHeader>login</LoginHeader>
              <InputDiv>
                <InputTitle>email address</InputTitle>
                <LoginInput
                  type="email"
                  value={email}
                  placeholder="email address"
                  onChange={(event) =>
                    updateEmail({ email: event.target.value })
                  }
                />
              </InputDiv>
              <InputDiv>
                <InputTitle>password</InputTitle>
                <LoginInput
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => updatePassword({ password: e.target.value })}
                />
              </InputDiv>

              <LoginButton onClick={() => signIn({ email, password })}>
                login
              </LoginButton>

              <CreateUserButton onClick={() => createUser({ email, password })}>
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
