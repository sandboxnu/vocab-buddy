import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Layout from "../components/Layout";
import { LOGIN_BACKGROUND } from "../constants/colors";
import { singleRequest } from "../data/actions";

const LoginInput = styled.input`
  display: block;
  margin: 2px;
  flex: 1;
`;

const LoginButton = styled.button`
  display: block;
  flex: 1;
`;

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: center,
  justify-content: center;
  flex-direction: column;
  flex: 1
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

const LoginInfoDiv = styled.div`
  flex: 1;
  background: ${LOGIN_BACKGROUND};
`;

// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  addUser: singleRequest.addUser,
  createUser: singleRequest.createUser,
  updateEmail: singleRequest.updateEmail,
  updatePassword: singleRequest.updatePassword,
});

const Login = ({
  email,
  password,
  updateEmail,
  updatePassword,
  createUser,
}) => {
  return (
    <Layout>
      <LoginSwitchingDiv>
        <LoginHoldingDiv>
          <LoginInput
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => updateEmail({ email: event.target.value })}
          />
          <LoginInput
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => updatePassword({ password: e.target.value })}
          />
          <LoginButton onClick={() => createUser({ email, password })}>
            Create User
          </LoginButton>
        </LoginHoldingDiv>
        <LoginInfoDiv></LoginInfoDiv>
      </LoginSwitchingDiv>
    </Layout>
  );
};

export default connector(Login);
