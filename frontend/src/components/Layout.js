import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { singleRequest } from "../data/actions";

const Wrapper = styled.div``;

const TestingLink = styled.a`
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;

const TestingId = styled.p``;
const TestingImage = styled.img``;

// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  addUser: singleRequest.addUser,
  downloadImage: singleRequest.downloadImage,
});

const Layout = ({ id, imageURL, request, addUser, downloadImage }) => {
  useEffect(() => {
    downloadImage({ imageURL: "dajin.png" });
  }, [downloadImage]);
  return (
    <Wrapper>
      <TestingLink onClick={request}>Welcome to vocab buddy</TestingLink>
      {id == null ? (
        <TestingLink onClick={() => addUser({ name: "Jack" })}>
          Add Jack to db as test
        </TestingLink>
      ) : (
        <TestingId>The id is {id}</TestingId>
      )}
      <TestingImage src={imageURL} alt="Dajin" />
    </Wrapper>
  );
};

export default connector(Layout);
