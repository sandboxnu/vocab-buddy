import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";
import CloudGroup from "../../components/CloudGroup";
import WordImages from "../../components/WordImages";
import { CLOUD } from "../../constants/colors";
import { Assessment, AssessmentResult } from "../../models/types";
import { shuffle } from "../../constants/utils";
import TriggeredPrompt from "../../components/TriggeredPrompt";

interface QuizWordsProps {
  assessment: Assessment;
  updateWords: (
    results: AssessmentResult[],
    isFinished: boolean,
    currentIdx: number,
    durationsInSeconds: number
  ) => void;
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
  shuffle(images);
  return images;
};

const QuizWords = ({ assessment, updateWords }: QuizWordsProps) => {
  let [currentIndex, setCurrentIndex] = useState(
    assessment.currentIndex
  );
  let [wordResponses, setWordResponses] = useState<
    AssessmentResult[]
  >([]);
  let [selectedIndex, setSelectedIndex] = useState(-1);
  let [wordStartTime, setWordStartTime] = useState(new Date());

  let word = assessment.words[currentIndex];
  let images = [word.correctImage].concat(word.incorrectImages);
  let [shuffled, setShuffled] = useState<string[]>([]);
  if (shuffled.length === 0) {
    setShuffled(shuffleImages(images));
  }

  const nextWord = () => {
    if (selectedIndex === -1) {
      return;
    }

    let curDate = new Date();
    let durationsInSeconds =
      (curDate.getTime() - wordStartTime.getTime()) / 1000;
    setWordStartTime(curDate);

    if (
      wordResponses.filter((response) => !response.correct).length >=
      24
    ) {
      // There are at least 24 incorrect
      updateWords(
        wordResponses,
        true,
        currentIndex,
        durationsInSeconds
      );
    } else if (currentIndex < assessment.words.length - 1) {
      // We still have words
      updateWords(
        wordResponses,
        false,
        currentIndex + 1,
        durationsInSeconds
      );
      setShuffled([]);
      setSelectedIndex(-1);
      setCurrentIndex(currentIndex + 1);
    } else {
      // All words exhausted
      updateWords(
        wordResponses,
        true,
        currentIndex,
        durationsInSeconds
      );
    }
  };

  return (
    <Layout hideBar={true}>
      <Container>
        <CloudGroup />
        <MainContent>
          <WordTitle>{word.value}</WordTitle>
          <Prompt>
            <PromptText>
              Touch the picture that shows {word.value}.
            </PromptText>
            <TriggeredPrompt
              isAssessment={true}
              prompt1Url={word.assessmentPrompt}
            />
          </Prompt>
          <ImageContainer>
            <WordImages
              images={shuffled}
              selected={selectedIndex}
              setSelected={(idx) => {
                setSelectedIndex(idx);
                setWordResponses((prevWordResponses) => {
                  const newWordEntry = {
                    word: word.id,
                    imageSelected: shuffled[idx],
                    correct: shuffled[idx] === word.correctImage,
                  };
                  const existingWordResponse = prevWordResponses.findIndex(
                    (response) => response.word === word.id
                  );
                  if (existingWordResponse === -1) {
                    return wordResponses.concat([newWordEntry]);
                  } else {
                    const newResponses = wordResponses.slice(
                      existingWordResponse,
                      existingWordResponse + 1
                    );
                    return newResponses.concat([newWordEntry]);
                  }
                });
              }}
            />
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
