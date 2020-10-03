import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getWords } from "../Assessments/data/actions";
import { getAllWords } from "../Assessments/data/reducer";
import styled from "styled-components";
import PromptSpeech from "../../components/PromptSpeech";
import { SEA_FOAM } from "../../constants/colors";
import Button from "../../components/Button";

const Wrapper = styled.div``;

const WordTitle = styled.p`
  margin-bottom: 20px;
  font-family: "Rubik";
  font-size: 50px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

const Prompt = styled.div`
  display: flex;
`;

const PromptText = styled.span`
  margin-right: 20px;
  font-family: "Open Sans";
  font-size: 20px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 520px auto;
  padding-top: 20px;
`;

const Image = styled.img`
  border-radius: 20px;
  width: 500px;
  height: 300px;

  :hover {
    cursor: pointer;
    border: solid 10px ${SEA_FOAM};
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

const shuffleImages = (images) => {
  images.sort((a, b) => {
    if (Math.random() > 0.5) return 1;
    else return -1;
  });
  return images;
};

const Quiz = ({ getWords, allWords }) => {
  let word = allWords && allWords[0];
  let images = word && [word.correctImage].concat(word.incorrectImages);
  let shuffled = (images && shuffleImages(images)) || [];
  let wrapperContainer = useRef();
  return (
    <Wrapper>
      <WordTitle onClick={() => getWords()}>miniscule</WordTitle>
      <Prompt>
        <PromptText>Touch the picture that shows miniscule.</PromptText>
        <PromptSpeech prompt="Touch the picture that shows miniscule." />
      </Prompt>
      <ImageContainer>
        <div>
          {shuffled.map((img, idx) => {
            return (
              <Image key={idx} src={img} onClick={(e) => console.log(e)} />
            );
          })}
        </div>
      </ImageContainer>
      <Button text={"next"} />
    </Wrapper>
  );
};

export default connector(Quiz);
