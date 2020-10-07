import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { TextInput } from "../components/TextInput";
import { INK, LOGIN_BACKGROUND } from "../constants/colors";
import { authenticationRequest } from "../data/actions";

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

const CreateUserSwitchingDiv = styled.div`
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

const ActuallyCreateUserDiv = styled.div`
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
  align-content: center;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const InputText = styled.p`
  margin: 2px;
  text-align: center;
  flex: 1;
`;

const RadioButton = styled.input`
  flex: 1;
  margin: auto;
`;

const SignUpHeader = styled.h1``;

const EvenSpacedDiv = styled.div`
  @media (max-width: 600px) {
    flex: 0;
  }

  @media (min-width: 601px) {
    flex: 1;
  }
`;

const CreateUserButton = styled.button`
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
  createUser: authenticationRequest.createUser,
});

const CreateUser = ({ signedIn, createUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [name, setName] = useState("");
  let [accountType, setAccountType] = useState("");
  let createUserWithCheck = () => {
    if (confirmPassword !== password) {
      alert("You need to confirm the password with the same password");
    } else if (accountType === "") {
      alert("You need to specify an account");
    } else {
      createUser({ email, password, name, accountType });
    }
  };

  let history = useHistory();

  useEffect(() => {
    if (signedIn) {
      history.push("/dashboard");
    }
  }, [signedIn, history]);
  // For right now, go to dashboard when signed in

  return (
    <Layout>
      <CreateUserSwitchingDiv>
        <LoginHoldingDiv>
          <HorizontalDiv>
            <EvenSpacedDiv />
            <ActuallyCreateUserDiv>
              <SignUpHeader>sign up</SignUpHeader>
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
              <TextInput
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                expectedValue={password}
                text="confirm password"
              />
              <TextInput
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                text="name"
              />
              <HorizontalDiv>
                <InputDiv>
                  <RadioButton
                    type="radio"
                    value="STUDENT"
                    checked={accountType === "STUDENT"}
                    onChange={() => setAccountType("STUDENT")}
                  />
                  <InputText>student</InputText>
                </InputDiv>
                <InputDiv>
                  <RadioButton
                    type="radio"
                    value="RESEARCHER"
                    checked={accountType === "RESEARCHER"}
                    onChange={() => setAccountType("RESEARCHER")}
                  />

                  <InputText>researcher</InputText>
                </InputDiv>
              </HorizontalDiv>

              <CreateUserButton onClick={() => createUserWithCheck()}>
                sign up
              </CreateUserButton>
            </ActuallyCreateUserDiv>
            <EvenSpacedDiv />
          </HorizontalDiv>
        </LoginHoldingDiv>

        <LoginInfoDiv></LoginInfoDiv>
      </CreateUserSwitchingDiv>
    </Layout>
  );
};

export default connector(CreateUser);
