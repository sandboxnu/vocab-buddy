import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PlayButton from "../../components/PlayButton";
import PromptSpeech from "../../components/PromptSpeech";
import PurpleButton from "../../components/PurpleButton";
import WordImages from "../../components/WordImages";
import { CLOUD } from "../../constants/colors";
import { Assessment, AssessmentResult } from "../../models/types";

interface QuizWordsProps {
  assessment: Assessment;
  updateWords: (results: AssessmentResult[]) => void;
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
  display: flex;
  align-items: center;
  background-color: ${CLOUD};
  border-radius: 10px;
  display: flex;
  padding: 5px 10px;
  width: max-content;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const PromptText = styled.span`
  margin-right: 10px;
  font-family: "Open Sans";
  font-size: 15px;
  flex: 1;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
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

const QuizWords = ({ assessment, updateWords }: QuizWordsProps) => {
  let [currentIndex, setCurrentIndex] = useState(assessment.currentIndex);
  let [wordResponses, setWordResponses] = useState<AssessmentResult[]>([]);
  let [selectedIndex, setSelectedIndex] = useState(-1);
  let word = assessment.words[currentIndex];
  let images = [word.correctImage].concat(word.incorrectImages);
  let [shuffled, setShuffled] = useState<string[]>([]);
  if (shuffled.length === 0) {
    setShuffled(shuffleImages(images));
  }

  const nextWord = () => {
    if (wordResponses.filter((response) => !response.correct).length >= 2) {
      updateWords(wordResponses);
    } else if (currentIndex < assessment.words.length - 1) {
      setShuffled([]);
      setSelectedIndex(-1);
      setCurrentIndex(currentIndex + 1);
    } else {
      updateWords(wordResponses);
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
              button={<PlayButton scale={0.8} />}
            />
          </Prompt>
          <ImageContainer>
            <WordImages images={shuffled}
                        selected={selectedIndex} 
                        hasValue={selectedIndex !== -1} 
                        setSelected={idx => {
                          setSelectedIndex(idx)
                          setWordResponses(wordResponses.concat([{word: word.id, correct: shuffled[idx] === word.correctImage}]))
                         } }/>
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
