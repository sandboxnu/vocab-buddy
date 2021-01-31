import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import CloudGroup from "../../components/CloudGroup";
import Balloon from "../../components/Balloon";
import Layout from "../../components/Layout";

const Container = styled.div``;

const TitleContainer = styled.p`
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  padding-top: 20px;
  text-align: center;
`;

const ComponentContainer = styled.div``;

const Reward = (): ReactElement => {
  const [score, setScore] = useState(0);

  return (
    <Layout>
      <Container>
        <TitleContainer>
          pop all the balloons to go back to Dashboard
        </TitleContainer>
        <CloudGroup />
        {score === 5 ? (
          <TitleContainer>
            Congradulations! You may go back to Dashboard now!
          </TitleContainer>
        ) : (
          <ComponentContainer>
            <Balloon
              top={20}
              left={10}
              onPop={() => setScore(score + 1)}
            />
            <Balloon
              top={20}
              left={30}
              onPop={() => setScore(score + 1)}
            />
            <Balloon
              top={20}
              left={50}
              onPop={() => setScore(score + 1)}
            />
            <Balloon
              top={60}
              left={20}
              onPop={() => setScore(score + 1)}
            />
            <Balloon
              top={60}
              left={60}
              onPop={() => setScore(score + 1)}
            />
          </ComponentContainer>
        )}
      </Container>
    </Layout>
  );
};

export default Reward;
