import React from "react";
import styled from "styled-components";
import Nav from "./Nav";

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.main`
  height: 100%;
  margin: 0 auto;
  padding: 5em 2em 5em 3.5em;
  width: 100%;
`;

// Main layout of the project that includes both header and navbar
const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Nav />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
