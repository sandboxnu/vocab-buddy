import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Blocker from "../../components/Blocker";
import Layout from "../../components/Layout";
import CloudGroup from "../../components/CloudGroup";
import DelayedNextButton from "../../components/DelayedNextButton";
import { SKY, SKY_RGBA } from "../../constants/colors";
import ExpandableImage from "../../components/ExpandableImage";
import TriggeredPrompt from "../../components/TriggeredPrompt";

interface FirstActivityProps {
  title: string;
  prompt1Url: string;
  prompt2Url: string;
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
    background-color: ${SKY_RGBA(0.8)};
  }
`;

const Image = styled(ExpandableImage)`
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

const FirstActivity = ({
  title,
  prompt1Url,
  prompt2Url,
  imageUrl,
  updateIntervention,
}: FirstActivityProps): ReactElement => {
  const [showNextButton, setShowNextButton] = useState(false);

  return (
    <Layout hideBar={true}>
      <Container>
        <CloudGroup />
        <MainContent>
          <DescriptionText>introduction + definition</DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <TriggeredPrompt
              prompt1Url={prompt1Url}
              prompt2Url={prompt2Url}
              triggerSecondPrompt={true}
              secondPromptFinishedHandler={() =>
                setShowNextButton(true)
              }
            />
          </Prompt>
          <Image src={imageUrl} />
          <ButtonContainer>
            <Blocker afterSeconds={60} repeatable={false}>
              <DelayedNextButton
                text={"next"}
                top={20}
                delay={6000}
                onClick={updateIntervention}
                canBeShown={showNextButton}
              />
            </Blocker>
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default FirstActivity;
