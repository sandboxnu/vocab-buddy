import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CloudImage from "../components/CloudImage";
import Layout from "../components/Layout";
import { TextInput } from "../components/TextInput";
import { INK, SEA_FOAM } from "../constants/colors";
import { authenticationRequest } from "../data/actions";
import { AccountType, CreateUserParams } from "../models/types";

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding-top: 5em;
  @media (max-width: 600px) {
    flex: 2;
    justify-content: flex-start;
    padding-left: 3em;
    padding-right: 3em;
  }

  @media (min-width: 601px) {
    flex: 1;
    justify-content: center;
  }
`;

const ActuallyCreateUserDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface RadioTextProps {
  isActive: boolean;
}
const RadioText = styled.p`
  border-bottom: ${({isActive} : RadioTextProps) => !isActive ? '0px solid clear' : `4px solid ${SEA_FOAM}`};
  flex: 1;
  margin-right: 15px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;

  :hover {
    cursor: default
  }
`;

const SignUpHeader = styled.h1`
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
`;

const CloudImageLeft = styled(CloudImage)`
  position: absolute;
  left: 0;
  width: 15%;

  
  @media (max-width: 600px) {
    @media (max-height: 800px) {
    height: 0px;
  }
    width: 20%;
    bottom: 1.5em;
  }

  @media (min-width: 601px) {
    top: 30%;
  }
`;

const CloudImageRight = styled(CloudImage)`
  position: absolute;
  right: 0;
  width: 15%;
  @media (max-width: 600px) {
    top: 3em;
    width: 20%;
  }

  @media (min-width: 601px) {
    bottom: 30%;
  }
`

const EvenSpacedDiv = styled.div`
  @media (max-width: 600px) {
    flex: 0;
  }

  @media (min-width: 601px) {
    flex: 1;
  }
`;

const LoginButton = styled.button`
  padding-left: 15px;
  background-color: #fff0;
  border-width: 0px;
  text-align: left;
  color: ${INK};
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

interface NameTextInputProps {
  isStudent: boolean;
}
const NameTextInput = styled(TextInput)`
  flex: 3;
  margin-right: ${({isStudent} : NameTextInputProps) => isStudent ? '15px' : '0px'}
`;

const AgeTextInput = styled(TextInput)`
  flex: 1;
  margin-left: 5;
`;

// An example of using a connector
const connector = connect((state) => state, {
  createUser: authenticationRequest.createUser,
});

interface CreateUserProps {
  signedIn: boolean;
  createUser: ({ email, password, name, accountType, age } : CreateUserParams) => void 
}

const CreateUser : FunctionComponent<CreateUserProps> = ({ signedIn, createUser }) : ReactElement => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [name, setName] = useState("");
  let [accountType, setAccountType] = useState("STUDENT");
  let [age, setAge] = useState("");
  let createUserWithCheck = () => {
    if (confirmPassword !== password) {
      alert("You need to confirm the password with the same password");
    } else if (accountType === "") {
      alert("You need to specify an account");
    } else {
      createUser({ email, password, name, accountType: accountType as AccountType, age: accountType === "RESEARCHER" ? null : parseInt(age) });
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
    <Layout hideBar={true}>
      <>
        <CloudImageLeft direction='left' />
        <CloudImageRight direction='right' />
        <LoginHoldingDiv>
          <HorizontalDiv>
            <EvenSpacedDiv/>
            <ActuallyCreateUserDiv>
              <SignUpHeader>sign up</SignUpHeader>
              <HorizontalDiv>
                <HorizontalDiv>
                <RadioText isActive={accountType === "STUDENT"} onClick={() => setAccountType("STUDENT")}>
                  student
                </RadioText>
                <RadioText isActive={accountType === "RESEARCHER"} onClick={() => setAccountType("RESEARCHER")}>
                  researcher
                </RadioText>
                </HorizontalDiv>
                <EvenSpacedDiv />
              </HorizontalDiv>
              <HorizontalDiv>
              <NameTextInput
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                text="name"
                isStudent={accountType === "STUDENT"}
              />
              {accountType === "STUDENT" && <AgeTextInput
                onChange={(e) => {
                  if (parseInt(e.target.value) != null) {
                    setAge(e.target.value);
                  }
                }}
                value={age}
                type="number"
                text="age"
                />}
              </HorizontalDiv>
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

              <CreateUserButton onClick={() => createUserWithCheck()}>
                sign up
              </CreateUserButton>

              <HorizontalDiv>
              Have an account?   
              <LoginButton onClick={() => history.push("/")}>
                login
              </LoginButton>
              </HorizontalDiv>
            </ActuallyCreateUserDiv>
            <EvenSpacedDiv />
          </HorizontalDiv>
        </LoginHoldingDiv>
    </>
       
    </Layout>
  );
};

export default connector(CreateUser);
