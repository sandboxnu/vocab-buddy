import React from 'react';
import { useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import CloudGroup from '../../components/CloudGroup';
import Layout from '../../components/Layout';
import PurpleButton from '../../components/PurpleButton';
import { INK } from '../../constants/colors';
import { ERROR_IMAGE } from '../../constants/images';
import { SignOut } from '../Dashboard/data/actions';
import { getIsSignedOut } from '../Dashboard/data/reducer';

const TitleText = styled.p`
  font-family: 'Rubik';
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  padding: 20px;
`;

const SignOutButton = styled.button`
  background-color: #fff0;
  border-width: 0px;
  color: ${INK};
  font-weight: bold;
  text-align: left;
  z-index: 100;

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }
`;

const WrappingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopImage = styled.img`
  max-width: 80vw;
`;

function ErrorScreen() {
  const signedOut = useSelector(getIsSignedOut);
  const logOut = SignOut.request;
  const navigate = useNavigate();

  if (signedOut) {
    navigate('/login');
  }

  return (
    <Layout>
      <>
        <CloudGroup />
        <WrappingDiv>
          <TopImage src={ERROR_IMAGE} />
          <TitleText>oops, something went wrong</TitleText>
          <PurpleButton
            text="return to dashboard"
            onClick={() => navigate('/dashboard')}
          />
          <SignOutButton onClick={logOut}>log out</SignOutButton>
        </WrappingDiv>
      </>
    </Layout>
  );
}

export default ErrorScreen;
