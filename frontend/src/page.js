import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Layout from "./components/Layout";
import { singleRequest } from "./data/actions";

const TestingId = styled.p``;
const TestingLink = styled.a``;
const TestingImage = styled.img``;

// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  addUser: singleRequest.addUser,
  downloadImage: singleRequest.downloadImage,
});

const Page = ({ id, imageURL, request, addUser, downloadImage }) => {
  useEffect(() => {
    downloadImage({ imageURL: "dajin.png" });
  }, [downloadImage]);
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
      <TestingImage src={imageURL} alt="Dajin" />
    </Layout>
  );
};

export default connector(Page);
