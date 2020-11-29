import React, { ReactElement, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { CORAL, SEA_FOAM, SKY } from "../../constants/colors";
import PromptSpeech from "../../components/PromptSpeech";
import ReplayButton from "../../components/ReplayButton";
import CloudImage from "../../components/CloudImage";
import DelayedNextButton from "../../components/DelayedNextButton";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getCurrentInterventions } from "./data/reducer"; 
import { updateIntervention } from "./data/actions"; 
import { getNextActivityIdx } from "../../constants/utils";
import { Interventions } from "../../models/types";

interface SecondActivityProps {
  title: string;
  activityIdx: number,
  wordIdx: number,
  prompt: string,
  imageUrls: ImageProps[],
  maxWordLength: number,
  interventions: Interventions,
  updateIntervention: ({ wordIdx, activityIdx }: {wordIdx: number, activityIdx: number}) => void,
}

interface ImageProps {
  url: string;
  correct: boolean;
  selected?: boolean;
  onClick?: () => void;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const UnselectedImage = styled.img`
  border-radius: 20px;
  padding: 10px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (min-width: 601px) {
    margin: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CorrectImage = styled.img`
  border-radius: 20px;
  border: 10px solid ${SEA_FOAM};

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (min-width: 601px) {
    margin: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const IncorrectImage = styled.img`
  border-radius: 20px;
  border: 10px solid ${CORAL};

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (min-width: 601px) {
    margin: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  display: inline-block;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const RedCircle = styled.div`
  position: absolute;
  text-align: center;
  top: 37%;
  left: 41.5%;
  height: 80px;
  width: 80px;
  background-color: ${CORAL};
  border-radius: 50%;
`;

const GreenCircle = styled.div`
  position: absolute;
  text-align: center;
  top: 37%;
  left: 41.5%;
  height: 80px;
  width: 80px;
  background-color: ${SEA_FOAM};
  border-radius: 50%;
`;

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 40px;
  margin-top: 20px;
  color: white;
`;

const StyledCheckOutlined = styled(CheckOutlined)`
  font-size: 40px;
  margin-top: 20px;
`;

const connector = connect(
  (state) => ({
    interventions: getCurrentInterventions(state),
  }),
  {
    updateIntervention: updateIntervention.request,
  }
);

const CloudImageLeft = styled(CloudImage)`
  position: absolute;
  left: 0;
  width: 15%;

  
  @media (max-width: 900px) {
    @media (max-height: 800px) {
    height: 0px;
  }
    width: 20%;
    bottom: 1.5em;
  }

  @media (min-width: 901px) {
    top: 30%;
  }
`;

const CloudImageRight = styled(CloudImage)`
  position: absolute;
  right: 0;
  width: 15%;
  @media (max-width: 900px) {
    top: 3em;
    width: 20%;
  }

  @media (min-width: 901px) {
    bottom: 30%;
  }
`;

const SecondActivity = ({
  title,
  activityIdx,
  wordIdx,
  prompt,
  imageUrls,
  interventions,
  maxWordLength,
  updateIntervention
}: SecondActivityProps): ReactElement => {

  const Image = ({
    url,
    correct,
    selected,
    onClick,
  }: ImageProps): ReactElement => {
    if (selected && correct) return <CorrectImage src={url} onClick={onClick} />;
    else if (selected && !correct)
      return <IncorrectImage src={url} onClick={onClick} />;
    else return <UnselectedImage src={url} onClick={onClick} />;
  };
  
  const nextActivityIdx = getNextActivityIdx(activityIdx, wordIdx, maxWordLength);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Layout>
      <Container>
      <CloudImageLeft direction='left' />
      <CloudImageRight direction='right' />
        <MainContent>
          <DescriptionText>example vs. non-example</DescriptionText>
          <WordTitle>
            {title}
          </WordTitle>
          <Prompt>
            <PromptSpeech
              prompt={prompt}
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          {imageUrls.map((img, index) => (
            <ImageContainer>
              <Image
                url={img.url}
                correct={img.correct}
                selected={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              />
              {!img.correct && index === selectedIndex && (
                <RedCircle>
                  <StyledCloseOutlined />
                </RedCircle>
              )}
              {img.correct && index === selectedIndex && (
                <GreenCircle>
                  <StyledCheckOutlined />
                </GreenCircle>
              )}
            </ImageContainer>
          ))}
          <ButtonContainer>
            <DelayedNextButton text="next" top={20} delay={1000} onClick={() => updateIntervention({wordIdx, activityIdx: nextActivityIdx})} />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(SecondActivity);
