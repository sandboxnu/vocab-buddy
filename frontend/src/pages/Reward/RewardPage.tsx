import React, { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CloudGroup from "../../components/CloudGroup";
import Balloon from "../../components/Balloon";
import Layout from "../../components/Layout";
import seedrandom from "seedrandom";

interface RewardPageProps {
  randSeed: number;
  maxBalloon: number;
  delay: number;
}

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

const RewardPage = ({
  randSeed,
  maxBalloon,
  delay,
}: RewardPageProps): ReactElement => {
  const history = useHistory();

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score === maxBalloon) {
      let timer = setTimeout(() => {
        history.push("/dashboard");
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [score, delay, maxBalloon, history]);

  const randomNum = (seedNum: number, min: number, max: number) => {
    let seed = seedrandom(`${seedNum * randSeed}`);
    return seed() * (max - min) + min;
  };

  const BallonGroups = () => {
    let balloons = [];
    for (let i = 0; i < 5; i++) {
      let t = randomNum(i, 20, 80);
      let l = randomNum(i + 1, 10, 60);
      balloons.push(
        <Balloon
          key={i}
          top={t}
          left={l}
          onPop={() => setScore(score + 1)}
        />
      );
    }
    return balloons;
  };

  return (
    <Layout>
      <Container>
        <TitleContainer>
          pop all the balloons to go back to Dashboard
        </TitleContainer>
        <CloudGroup />
        {score === maxBalloon ? (
          <TitleContainer>
            Congratulations! You have popped all the balloons :)
            Redirecting to Dashboard...
          </TitleContainer>
        ) : (
          <ComponentContainer>{BallonGroups()}</ComponentContainer>
        )}
      </Container>
    </Layout>
  );
};

export default RewardPage;
