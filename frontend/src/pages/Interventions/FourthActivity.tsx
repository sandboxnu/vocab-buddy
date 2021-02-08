import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import AutoPrompt from "../../components/AutoPrompt";
import ReplayButton from "../../components/ReplayButton";
import DelayedNextButton from "../../components/DelayedNextButton";
import Blocker from "../../components/Blocker";
import CloudGroup from "../../components/CloudGroup";
import ExpandableImage from "../../components/ExpandableImage";
import { REPLAY_HOVER, SKY } from "../../constants/colors";

interface FourthActivityProps {
  title: string;
  prompt: string;
  imageUrl: string;
  updateIntervention: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContent = styled.div`
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const DescriptionText = styled.p`
  color: #666;
  font-family: "Rubik";
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;

const WordTitle = styled.p`
  font-family: "Rubik";
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Prompt = styled.div`
  align-items: center;
  background-color: ${SKY};
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  padding: 1px 5px;
  width: max-content;

  :hover {
    background-color: ${REPLAY_HOVER};
  }
`;

const Image = styled(ExpandableImage)`
  border-radius: 20px;
  min-width: 600px;

  @media (max-width: 900px) {
    min-width: unset;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const FourthActivity = ({
  title,
  prompt,
  imageUrl,
  updateIntervention,
}: FourthActivityProps): ReactElement => {
  return (
    <Layout>
      <Container>
        <CloudGroup />
        <MainContent>
          <DescriptionText>review with new picture</DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <AutoPrompt
              prompt={prompt}
              button={<ReplayButton scale={0.8} />}
              delay={30000}
            />
          </Prompt>
          <Image src={imageUrl} />
          <ButtonContainer>
            <Blocker afterSeconds={30} repeatable={false}>
              <DelayedNextButton
                text={"next"}
                top={20}
                delay={1000}
                onClick={updateIntervention}
              />
            </Blocker>
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default FourthActivity;
