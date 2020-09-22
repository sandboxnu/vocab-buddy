import React from "react";
import styled from "styled-components";
import { LIGHT_PURPLE, PURPLE } from "../constants/colors";
import Nav from "./Nav";

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.main`
  height: 100vh;
  margin: 0 auto;
  padding: 5em 2em;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${LIGHT_PURPLE};
  bottom: 0;
  height: 30px;
  position: fixed;
  width: 100%;
`;

const FooterContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: 2em;
`;

// Main layout of the project that includes both header and navbar
const Layout = (props) => {
  return (
    <Wrapper>
      <Nav />
      <Content>{props.children}</Content>
      <Footer>
        <FooterContent>
          Made by students @&nbsp;
          <a href="https://www.sandboxnu.com">Sandbox</a>. Source on&nbsp;
          <a href="https://github.com/sandboxnu/vocab-buddy/">GitHub</a>.
        </FooterContent>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
