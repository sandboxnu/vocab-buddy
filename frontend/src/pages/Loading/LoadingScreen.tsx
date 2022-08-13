import React from 'react';
import styled from 'styled-components';
import { INK } from '../../constants/colors';
import loading from '../../assets/loading.svg';

const LoadingIcon = styled.img`
  animation: rotation 1.5s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const LoadingTitle = styled.p`
  font-family: 'Rubik';
  font-size: 26px;
  font-weight: 700;
  margin-top: 3vh;
  color: ${INK};
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function LoadingScreen() {
  return (
    <LoadingContainer>
      <LoadingIcon src={loading}></LoadingIcon>
      <LoadingTitle>loading</LoadingTitle>
    </LoadingContainer>
  );
}

export default LoadingScreen;
