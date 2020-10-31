import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import { getWords } from "./data/actions";
import { getAllWords } from "./data/reducer";
import styled from "styled-components";
import PurpleButton from "../../components/PurpleButton";
import PlayButton from "../../components/PlayButton";
import { Word } from "../../models/types";
import { CLOUD } from "../../constants/colors";
import AutoPrompt from "../../components/AutoPrompt";

interface QuizProps {
  getWords: () => void,
  allWords: Word[],
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

const connector = connect(
  (state) => ({
    allWords: getAllWords(state),
  }),
  {
    getWords: getWords.request,
  }
);

const shuffleImages = (images: any[]) => {
  images.sort((a: any, b: any) => {
    if (Math.random() > 0.5) return 1;
    else return -1;
  });
  return images;
};

const getNextImageID = (path: string) => {
  let splitPath = path.split("/");
  let currentId = splitPath[splitPath.length - 1];
  return parseInt(currentId) + 1;
};

const Quiz = ({ getWords, allWords }: QuizProps) => {
  let word = allWords && allWords[0];
  let images = word && [word.correctImage].concat(word.incorrectImages);
  let shuffled = (images && shuffleImages(images)) || [];
  let history = useHistory();
  let path = window.location && window.location.pathname;
  let nextImageId = getNextImageID(path);
  return (
    <Layout>
      <Container>
        <MainContent>
          <WordTitle onClick={() => getWords()}>miniscule</WordTitle>
          <Prompt>
            <PromptText>Touch the picture that shows miniscule.</PromptText>
            <AutoPrompt prompt="Touch the picture that shows miniscule." button={<PlayButton scale={0.8} />}/>
          </Prompt>
          <ImageContainer>
            {shuffled.map((img: string, idx: number) => {
              return <Image key={idx} src={img} />;
            })}
          </ImageContainer>
          <ButtonContainer>
            <PurpleButton
              text={"next"}
              onClick={() => history.push(`/assessments/${nextImageId}`)}
            />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(Quiz);
