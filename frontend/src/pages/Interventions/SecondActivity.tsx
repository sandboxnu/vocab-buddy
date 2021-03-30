import React, { ReactElement, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import {
  CORAL,
  SEA_FOAM,
  SKY,
  SKY_RGBA,
} from "../../constants/colors";
import CloudGroup from "../../components/CloudGroup";
import DelayedNextButton from "../../components/DelayedNextButton";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Blocker from "../../components/Blocker";
import { indexOf } from "../../constants/utils";
import TriggeredPrompt from "../../components/TriggeredPrompt";

interface SecondActivityProps {
  title: string;
  prompt: string;
  imageUrls: ImageProps[];
  updateIntervention: (correct: boolean) => void;
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

  :hover {
    background-color: ${SKY_RGBA(0.8)};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

interface ColoredImageProps {
  color: string;
}
const ColoredImage = styled.img`
  border-radius: 20px;
  border: 10px solid ${({ color }: ColoredImageProps) => color};

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

const StyledDivForClicks = styled.div``;
const Image = ({
  url,
  correct,
  selected,
  onClick,
}: ImageProps): ReactElement => {
  return (
    <ColoredImage
      src={url}
      onClick={onClick}
      color={selected ? (correct ? SEA_FOAM : CORAL) : "transparent"}
    />
  );
};

const SecondActivity = ({
  title,
  prompt,
  imageUrls,
  updateIntervention,
}: SecondActivityProps): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Layout>
      <Container>
        <CloudGroup />
        <MainContent>
          <DescriptionText>example vs. non-example</DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <TriggeredPrompt
              prompt1Url={
                "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/service-bell_daniel_simion.mp3?alt=media&token=d4222a38-14bc-49a8-b285-7786cf89f246"
              }
              prompt2Url={
                "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/poker-chips-daniel_simon.mp3?alt=media&token=affc0118-9b6a-493d-8b55-7e69d71b43b9"
              }
              triggerSecondPrompt={selectedIndex !== -1}
            />
          </Prompt>
          <Blocker afterSeconds={15} repeatable={false}>
            <StyledDivForClicks>
              {imageUrls.map((img, index) => (
                <ImageContainer>
                  <Image
                    url={img.url}
                    correct={img.correct}
                    selected={index === selectedIndex}
                    onClick={() => {
                      selectedIndex === -1 && setSelectedIndex(index);
                    }}
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
            </StyledDivForClicks>
          </Blocker>
          <ButtonContainer>
            <DelayedNextButton
              text="next"
              top={20}
              delay={1000}
              onClick={() =>
                updateIntervention(
                  selectedIndex ===
                    indexOf(imageUrls, (val) => val.correct)
                )
              }
              canBeShown={selectedIndex !== -1}
            />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default SecondActivity;
