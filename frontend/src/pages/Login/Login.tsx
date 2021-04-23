import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Toast from "../../components/Toast";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";
import { TextInput } from "../../components/TextInput";
import { INK, LOGIN_BACKGROUND } from "../../constants/colors";
import { LoginParams, ResetPasswordParams } from "../../models/types";
import { authenticationRequest } from "./data/actions";
import { getLoginError, getSignedIn } from "./data/reducer";

const ResetUserButton = styled.button`
  padding-left: 0;
  background-color: #fff0;
  border-width: 0px;
  text-align: left;
  color: ${INK};
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }
`;

const CreateUserButton = styled(ResetUserButton)`
  padding-left: 5px;
`;

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  @media (max-width: 900px) {
    flex: 2;
    justify-content: flex-start;
  }

  @media (min-width: 901px) {
    flex: 1;
    justify-content: center;
  }
`;

const LoginSwitchingDiv = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100%;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 7em 0em 7em 0em;
  }

  @media (min-width: 901px) {
    flex-direction: row;
  }
`;

const ActuallyLoginDiv = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 900px) {
    padding: 1em 2.5em 0em 2.5em;
  }
`;

const LoginInfoDiv = styled.div`
  flex: 1;
  background: ${LOGIN_BACKGROUND};
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }

  @media (min-width: 901px) {
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
  @media (max-width: 900px) {
    flex: 0;
  }

  @media (min-width: 901px) {
    flex: 1;
  }
`;

const LoginImage = styled.img`
  flex: 5;
  @media (max-width: 900px) {
    flex: 0;
    margin: auto;
    width: 80vw;
  }

  @media (min-width: 901px) {
    margin: auto;
    width: 40vw;
  }
`;

const StyledPurpleButton = styled(PurpleButton)`
  flex: 1;
  width: 100%;
  margin: 16px 0px;
  padding: 10px;
`;

// An example of using a connector
const connector = connect(
  (state) => ({
    signedIn: getSignedIn(state),
    error: getLoginError(state),
  }),
  {
    signIn: authenticationRequest.signIn,
    resetPassword: authenticationRequest.resetPassword,
  }
);

const loginIllustration =
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/login_illustration.png?alt=media&token=1a270ca5-e24b-4327-83af-89972e0e112e";

interface LoginProps {
  signedIn: boolean;
  signIn: ({ email, password }: LoginParams) => void;
  resetPassword: ({ email }: ResetPasswordParams) => void;
  error?: Error;
}

interface State {
  redirect: string;
}

const Login: FunctionComponent<LoginProps> = ({
  signedIn,
  signIn,
  resetPassword,
  error,
}): ReactElement => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showError, setShowError] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let redirect: string | null = null;
  if (location.state != null) {
    redirect = (location.state as State).redirect;
  }

  let doResetPassword = () => {
    let email = prompt("What is your email?");

    if (email == null || email === "") {
      return;
    }

    setShowError(true);

    resetPassword({ email });
  };

  const doSignIn = () => {
    setShowError(true);
    signIn({ email, password });
  };

  useEffect(() => {
    if (signedIn) {
      if (redirect != null) {
        history.replace(redirect);
      } else {
        history.push("/dashboard");
      }
    }
  }, [signedIn, history, redirect]);

  return (
    <Layout hideBar={true}>
      <>
        <Toast
          message={showError ? error?.message : undefined}
          onClose={() => setShowError(false)}
        />
        <LoginSwitchingDiv>
          <LoginInfoDiv>
            <EvenSpacedDiv />
            <LoginImage src={loginIllustration} />
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
                  onKeyDown={(e) => e.key === "Enter" && doSignIn()}
                />

                <StyledPurpleButton
                  text={"login"}
                  top={0}
                  onClick={() => doSignIn()}
                />

                <ResetUserButton onClick={() => doResetPassword()}>
                  forgot password
                </ResetUserButton>
                <HorizontalDiv>
                  Don't have an account?
                  <CreateUserButton
                    onClick={() => history.push("/sign_up")}
                  >
                    sign up
                  </CreateUserButton>
                </HorizontalDiv>
              </ActuallyLoginDiv>
              <EvenSpacedDiv />
            </HorizontalDiv>
          </LoginHoldingDiv>
        </LoginSwitchingDiv>
      </>
    </Layout>
  );
};

export default connector(Login);
