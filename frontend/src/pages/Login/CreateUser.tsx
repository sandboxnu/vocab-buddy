import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CloudGroup from '../../components/CloudGroup';
import Layout from '../../components/Layout';
import PurpleButton from '../../components/PurpleButton';
import TextInput from '../../components/TextInput';
import { INK, SEA_FOAM } from '../../constants/colors';
import authenticationRequest from './data/actions';
import { AccountType, CreateUserParams } from '../../models/types';
import { selectors } from '../index';
import Toast from '../../components/Toast';

const LoginHoldingDiv = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding-top: 5em;
  @media (max-width: 900px) {
    flex: 2;
    justify-content: flex-start;
    padding-left: 3em;
    padding-right: 3em;
  }

  @media (min-width: 901px) {
    flex: 1;
    justify-content: center;
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

interface RadioTextProps {
  isActive: boolean;
}
const RadioText = styled.p`
  border-bottom: ${({ isActive }: RadioTextProps) => (!isActive ? '0px solid clear' : `4px solid ${SEA_FOAM}`)};
  flex: 1;
  margin-right: 15px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;

  :hover {
    cursor: default;
  }
`;

const SignUpHeader = styled.h1`
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
`;

const EvenSpacedDiv = styled.div`
  @media (max-width: 900px) {
    flex: 0;
  }

  @media (min-width: 901px) {
    flex: 1;
  }
`;

const LoginButton = styled.button`
  padding-left: 15px;
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
  margin-right: ${({ isStudent }: NameTextInputProps) => (isStudent ? '15px' : '0px')};
`;

const AgeTextInput = styled(TextInput)`
  flex: 1;
  margin-left: 5;
`;

const CreateUser = (): ReactElement => {
  const dispatch = useDispatch();
  const signedIn = useSelector(selectors.login.getSignedIn);
  const error = useSelector(selectors.login.getCreateUserError);
  const { createUser } = authenticationRequest;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('STUDENT');
  const [age, setAge] = useState('');
  const [errorString, setErrorString] = useState('');
  const [networkErrorShown, setNetworkErrorShown] = useState(false);
  const createUserWithCheck = () => {
    if (confirmPassword !== password) {
      setErrorString(
        'you need to confirm the password with the same password'
      );
    } else if (
      (accountType === 'STUDENT' && !age)
      || !name
      || !password
      || !email
    ) {
      setErrorString('please fill in all fields');
    } else {
      setNetworkErrorShown(true);
      dispatch(
        createUser({
          email,
          password,
          name,
          accountType: accountType as AccountType,
          age:
            accountType === 'RESEARCHER' ? null : parseInt(age, 10),
        })
      );
    }
  };

  useEffect(() => {
    if (signedIn) {
      navigate('/dashboard');
    }
  }, [signedIn, navigate]);
  // For right now, go to dashboard when signed in

  return (
    <Layout hideBar>
      <>
        <CloudGroup />
        <LoginHoldingDiv>
          <Toast
            message={
              errorString === ''
                ? networkErrorShown
                  ? error?.message
                  : undefined
                : errorString
            }
            onClose={() => {
              setErrorString('');
              setNetworkErrorShown(false);
            }}
          />
          <HorizontalDiv>
            <EvenSpacedDiv />
            <ActuallyCreateUserDiv>
              <SignUpHeader>sign up</SignUpHeader>
              <HorizontalDiv>
                <HorizontalDiv>
                  <RadioText
                    isActive={accountType === 'STUDENT'}
                    onClick={() => setAccountType('STUDENT')}
                  >
                    student
                  </RadioText>
                  <RadioText
                    isActive={accountType === 'RESEARCHER'}
                    onClick={() => setAccountType('RESEARCHER')}
                  >
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
                  isStudent={accountType === 'STUDENT'}
                />
                {accountType === 'STUDENT' && (
                  <AgeTextInput
                    onChange={(e) => {
                      if (parseInt(e.target.value, 10) != null) {
                        setAge(e.target.value);
                      }
                    }}
                    value={age}
                    type="number"
                    text="age"
                  />
                )}
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

              <StyledPurpleButton
                text="sign up"
                top={0}
                onClick={() => createUserWithCheck()}
              />

              <HorizontalDiv>
                Have an account?
                <LoginButton onClick={() => navigate('/')}>
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

export default CreateUser;
