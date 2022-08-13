import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import DelayedNextButton from "../../components/DelayedNextButton";
import Blocker from "../../components/Blocker";
import CloudGroup from "../../components/CloudGroup";
import ExpandableImage from "../../components/ExpandableImage";
import { SKY, SKY_RGBA } from "../../constants/colors";
import TriggeredPrompt from "../../components/TriggeredPrompt";

interface FourthActivityProps {
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
  prompt1Url,
  prompt2Url,
  imageUrl,
  updateIntervention,
}: FourthActivityProps): ReactElement => {
  const [triggerSecondPrompt, setTriggerSecondPrompt] = useState(
    false
  );
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTriggerSecondPrompt(true);
    }, 5000);
  });

  return (
    <Layout hideBar={true}>
      <Container>
        <CloudGroup />
        <MainContent>
          <DescriptionText>review with new picture</DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <TriggeredPrompt
              prompt1Url={prompt1Url}
              prompt2Url={prompt2Url}
              triggerSecondPrompt={triggerSecondPrompt}
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

export default FourthActivity;
