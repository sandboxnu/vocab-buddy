import React from "react";
import { connect } from "react-redux";
import { getWords } from "../Assessments/data/actions";
import { getAllWords } from "../Assessments/data/reducer";
import styled from "styled-components";
import PromptSpeech from "../../components/PromptSpeech";

const WordTitle = styled.p`
  margin-bottom: 20px;
  font-family: "Rubik";
  font-size: 50px;
  font-weight: 700;
  text-transform: lowercase;
`;

const Prompt = styled.div`
  display: flex;
`;

const PromptText = styled.span`
  margin-right: 20px;
  font-family: "Open Sans";
  font-size: 20px;
`;

const ImageContainer = styled.div``;

const Image = styled.img``;

const connector = connect(
  (state) => ({
    allWords: getAllWords(state),
  }),
  {
    getWords: getWords.request,
  }
);

const Quiz = ({ getWords, allWords }) => {
  return (
    <>
      <WordTitle onClick={() => getWords()}>miniscule</WordTitle>
      <Prompt>
        <PromptText>Touch the picture that shows miniscule.</PromptText>
        <PromptSpeech prompt="Touch the picture that shows miniscule." />
      </Prompt>
      {allWords.map((word) => {
        return <Image src={word.correctImage}></Image>;
      })}
    </>
  );
};

export default connector(Quiz);
