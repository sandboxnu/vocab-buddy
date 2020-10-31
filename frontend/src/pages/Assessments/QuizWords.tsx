import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Assessment } from "../../models/types";
import styled from "styled-components";
import { CLOUD } from "../../constants/colors";
import PromptSpeech from "../../components/PromptSpeech";
import PurpleButton from "../../components/PurpleButton";

interface QuizWordsProps {
  assessment: Assessment;
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

const WordTitle = styled.p`
  margin-bottom: 10px;
  font-family: "Rubik";
  font-size: 35px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Prompt = styled.div`
  align-items: center;
  background-color: ${CLOUD};
  border-radius: 10px;
  display: flex;
  padding: 1px 5px;
  width: max-content;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const PromptText = styled.span`
  margin-right: 10px;
  font-family: "Open Sans";
  font-size: 15px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 30% 30%;
`;

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ButtonContainer = styled.div`
  @media (min-width: 600px) {
    float: right;
  }
`;

const shuffleImages = (images: any[]) => {
  images.sort((a: any, b: any) => {
    if (Math.random() > 0.5) return 1;
    else return -1;
  });
  return images;
};

const QuizWords = ({ assessment }: QuizWordsProps) => {
  let [currentIndex, setCurrentIndex] = useState(assessment.currentIndex);
  let [word, setWord] = useState(assessment.words[currentIndex]);
  let images = [word.correctImage].concat(word.incorrectImages);
  let shuffled = shuffleImages(images);

  const nextWord = () => {
    if (currentIndex < assessment.words.length - 1) {
      setWord(assessment.words[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Layout>
      <Container>
        <MainContent>
          <WordTitle>{word.value}</WordTitle>
          <Prompt>
            <PromptText>Touch the picture that shows {word.value}.</PromptText>
            <PromptSpeech
              prompt={`Touch the picture that shows ${word.value}.`}
            />
          </Prompt>
          <ImageContainer>
            {shuffled.map((img: string, idx: number) => {
              return <Image key={idx} src={img} />;
            })}
          </ImageContainer>
          <ButtonContainer>
            <PurpleButton text={"next"} onClick={nextWord} />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default QuizWords;
