import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import { getWords } from "../Assessments/data/actions";
import { getAllWords } from "../Assessments/data/reducer";
import styled from "styled-components";
import PromptSpeech from "../../components/PromptSpeech";
import PurpleButton from "../../components/PurpleButton";

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
  margin-bottom: 15px;
  font-family: "Rubik";
  font-size: 40px;
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
  grid-template-columns: 400px auto;
  margin-top: 15px;

  @media (max-width: 900px) {
    grid-template-columns: 250px auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 100px auto;
  }
`;

const Image = styled.img`
  border-radius: 20px;
  width: 400px;
  height: 240px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (max-width: 900px) {
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
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

const getNextImageID = (path) => {
  let splitPath = path.split("/");
  let currentId = splitPath[splitPath.length - 1];
  return parseInt(currentId) + 1;
};

const Quiz = ({ getWords, allWords }) => {
  let word = allWords && allWords[0];
  let images = word && [word.correctImage].concat(word.incorrectImages);
  let shuffled = (images && shuffleImages(images)) || [];
  let containerWidth = useRef(null);
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
            <PromptSpeech prompt="Touch the picture that shows miniscule." />
          </Prompt>
          <ImageContainer ref={containerWidth}>
            {shuffled.map((img, idx) => {
              return <Image key={idx} src={img} />;
            })}
          </ImageContainer>
          <PurpleButton
            text={"next"}
            top={20}
            onClick={() => history.push(`/assessments/${nextImageId}`)}
          />
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(Quiz);
