import React, { ReactElement, useEffect } from "react";
import { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { User, UserSettings } from "../../models/types";
import PurpleButton from "../../components/PurpleButton";
import { TextInput } from "../../components/TextInput";
import { getCurrentUser, getDashboardError } from "./data/reducer";
import { UpdateUserSettings } from "./data/actions";
import Toast from "../../components/Toast";
import { utc } from "moment";
import { DateInput } from "../../components/DateInput";

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding-top: 5em;

  justify-content: center;
  flex: 5.5;

  @media (max-width: 900px) {
    flex: 2;
    justify-content: flex-start;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const ActuallyCreateUserDiv = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: space-between;
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SectionHeader = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  margin: 6vh 0vh 3vh;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const EvenSpacedDiv = styled.div`
  @media (max-width: 900px) {
    flex: 0;
  }

  @media (min-width: 901px) {
    flex: 1;
  }
`;

const StyledPurpleButton = styled(PurpleButton)`
  flex: 1;
  width: 100%;
  margin: 16px 0px;
  padding: 10px;
`;

interface NameTextInputProps {
  isStudent: boolean;
}
const NameTextInput = styled(TextInput)`
  flex: 3;
  margin-right: ${({ isStudent }: NameTextInputProps) =>
    isStudent ? "15px" : "0px"};
`;

const AgeTextInput = styled(DateInput)`
  flex: 1;
  margin-left: 5;
`;

// An example of using a connector
const connector = connect(
  (state) => ({
    user: getCurrentUser(state),
    error: getDashboardError(state),
  }),
  {
    updateSettings: UpdateUserSettings.request,
  }
);

interface SettingsProps {
  user: User;
  error?: Error;
  updateSettings: ({
    newName,
    newDob,
    newPassword,
    currentPassword,
  }: UserSettings) => void;
}

const Settings: FunctionComponent<SettingsProps> = ({
  user,
  error,
  updateSettings,
}): ReactElement => {
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [currentPassword, setCurrentPassword] = useState("");
  let [name, setName] = useState(user.name);
  let [dob, setDob] = useState(user.dob);
  let [errorString, setErrorString] = useState("");
  let [networkErrorShown, setNetworkErrorShown] = useState(false);
  let [showSuccessToast, setShowSuccessToast] = useState(false);

  let updateUserSettings = () => {
    setErrorString("");
    setShowSuccessToast(false);
    if (confirmPassword !== password) {
      setErrorString(
        "you need to confirm the password with the same password"
      );
      return;
    }

    if (name.length > 0 && currentPassword.length === 0) {
      setErrorString(
        "you need to enter your current password to change your name"
      );
      return;
    }

    if (password.length > 0 && currentPassword.length === 0) {
      setErrorString(
        "you need to enter your current password to change your password"
      );
      return;
    }

    setNetworkErrorShown(true);

    updateSettings({
      newName: name === user.name ? undefined : name,
      newDob: dob === user.dob ? undefined : dob,
      newPassword: password === "" ? undefined : password,
      currentPassword:
        currentPassword === "" ? undefined : currentPassword,
    });
  };

  useEffect(() => {
    if (networkErrorShown) {
      setShowSuccessToast(true);
    }
  }, [user, networkErrorShown]);

  return (
    <LoginHoldingDiv>
      {errorString !== "" || error?.message ? (
        <Toast
          topMargin="70px"
          message={
            errorString === ""
              ? networkErrorShown
                ? error?.message
                : undefined
              : errorString
          }
          onClose={() => {
            setErrorString("");
            setNetworkErrorShown(false);
          }}
        />
      ) : (
        showSuccessToast && (
          <Toast
            topMargin="70px"
            message={"Successfully updated user settings"}
            alertType="success"
            onClose={() => {
              setErrorString("");
              setNetworkErrorShown(false);
              setShowSuccessToast(false);
            }}
          />
        )
      )}
      <HorizontalDiv>
        <EvenSpacedDiv />
        <ActuallyCreateUserDiv>
          <SectionHeader>edit profile</SectionHeader>
          <HorizontalDiv>
            <NameTextInput
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              text="name"
              isStudent={user.accountType === "STUDENT"}
            />
            {user.accountType === "STUDENT" && (
              <AgeTextInput
                text="date of birth"
                onChange={(e) => {
                  if (e != null) {
                    setDob(e.toDate());
                  }
                }}
                value={utc(dob.toUTCString())}
              />
            )}
          </HorizontalDiv>
          <SectionHeader>edit login</SectionHeader>
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            text="password"
            autoComplete={"new-password"}
          />
          <TextInput
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            expectedValue={password}
            text="confirm password"
            autoComplete={"new-password"}
          />
          <TextInput
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            type="password"
            text="current password*"
          />
          <StyledPurpleButton
            text={"save"}
            top={0}
            onClick={() => updateUserSettings()}
          />
        </ActuallyCreateUserDiv>
        <EvenSpacedDiv />
      </HorizontalDiv>
    </LoginHoldingDiv>
  );
};

export default connector(Settings);
