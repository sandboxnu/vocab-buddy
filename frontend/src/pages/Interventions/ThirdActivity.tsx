import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { SKY, SKY_RGBA } from "../../constants/colors";
import CloudGroup from "../../components/CloudGroup";
import YesNoSelection from "../../components/YesNoSelection";
import DelayedNextButton from "../../components/DelayedNextButton";
import TriggeredPrompt from "../../components/TriggeredPrompt";

interface ThirdActivityProps {
  title: string;
  prompt: string;
  imageUrl: string;
  answer: boolean;
  updateIntervention: (correct: boolean) => void;
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

const Image = styled.img`
  border-radius: 20px;
  min-width: 600px;

  @media (max-width: 900px) {
    min-width: unset;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (min-width: 901px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NextContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ThirdActivity = ({
  title,
  prompt,
  imageUrl,
  answer,
  updateIntervention,
}: ThirdActivityProps): ReactElement => {
  let [selected, setSelected] = useState(-1);
  return (
    <Layout>
      <Container>
        <CloudGroup />
        <MainContent>
          <DescriptionText>
            yes or no context question
          </DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <TriggeredPrompt
              prompt1Url={
                "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/minuscule_prompt1.mp3?alt=media&token=1a088281-a886-41bc-8ac8-921f032d5cc0"
              }
              prompt2Url={
                "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/minuscule_prompt2.mp3?alt=media&token=f14a750a-9470-49e7-9d90-ff9660c2402e"
              }
              triggerSecondPrompt={selected !== -1}
            />
          </Prompt>
          <Image src={imageUrl} />
          <ButtonContainer>
            <YesNoSelection
              correctAnswer={answer}
              selected={selected}
              setSelected={setSelected}
            />
            <NextContainer>
              <DelayedNextButton
                text="next"
                top={20}
                delay={3000}
                onClick={() => {
                  updateIntervention((selected === 1) === answer);
                }}
                canBeShown={selected !== -1}
              />
            </NextContainer>
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default ThirdActivity;
