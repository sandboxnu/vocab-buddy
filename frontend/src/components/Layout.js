import React from "react";
import styled from "styled-components";
import Nav from "./Nav";

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.main`
  height: 100vh;
  margin: 0 auto;
  padding: 7em 2em 7em 3.5em;
  width: 100%;
`;

// Main layout of the project that includes both header and navbar
const Layout = (props) => {
  return (
    <Wrapper>
      <Nav />
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default Layout;
