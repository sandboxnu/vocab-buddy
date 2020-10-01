import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Layout from "../components/Layout";
import { singleRequest } from "../data/actions";

const TestingId = styled.p``;
const TestingLink = styled.a``;
const TestingImage = styled.img``;
const TestingWrapper = styled.div``;

// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  addUser: singleRequest.addUser,
  downloadImage: singleRequest.downloadImage,
  getWords: singleRequest.getWords,
});

const Login = ({
  id,
  imageURL,
  words,
  request,
  addUser,
  downloadImage,
  getWords,
}) => {
  useEffect(() => {
    downloadImage({ imageURL: "dajin.png" });
    getWords();
  }, [downloadImage, getWords]);
  return (
    <Layout>
      <TestingLink onClick={request}>Welcome to vocab buddy</TestingLink>
      {id == null ? (
        <TestingLink onClick={() => addUser({ name: "Jack" })}>
          Add Jack to db as test
        </TestingLink>
      ) : (
        <TestingId>The id is {id}</TestingId>
      )}
      {words != null &&
        words.map((word) => {
          return (
            <TestingWrapper key={word.id}>
              <TestingLink> {word.value} </TestingLink>
              <TestingImage src={word.correctImage} />
            </TestingWrapper>
          );
        })}
      <TestingImage src={imageURL} alt="Dajin" />
    </Layout>
  );
};

export default connector(Login);
