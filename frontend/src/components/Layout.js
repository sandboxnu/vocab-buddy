import React from "react";
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

// An example of using a connector
const connector = connect((state) => ({}), {
  request: singleRequest.request,
});

const Layout = ({ request }) => {
  return (
    <Wrapper>
      <TestingLink onClick={request}>Welcome to vocab buddy</TestingLink>
    </Wrapper>
  );
};

export default connector(Layout);
