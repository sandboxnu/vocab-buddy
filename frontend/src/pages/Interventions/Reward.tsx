import React, { ReactElement, useState } from 'react';
import styled from "styled-components";
import Layout from "../../components/Layout";
import { BALLOON } from "../../constants/images";

const TitleContainer = styled.p`
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  padding-top: 20px;
  text-align: center;
`;

const BalloonContainer = styled.img`
  transform: scale(0.8);
  
  :hover {
    cursor: pointer;
  }
`;

const Reward = (): ReactElement => {
  const [popped, setPopped] = useState(false);

  return (
  <Layout>
    <>
    <TitleContainer>pop all the balloons to go back to Dashboard</TitleContainer>
    {!popped && <BalloonContainer src={BALLOON} onClick={() => setPopped(true)}/>}
    </>
  </Layout>
  )
}

export default Reward;