import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
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

const Footer: FunctionComponent = (): ReactElement => {
  return (
    <FooterContainer>
      <FooterContent>
        Made by students @&nbsp;
        <a href="https://www.sandboxnu.com">Sandbox</a>. Source
        on&nbsp;
        <a href="https://github.com/sandboxnu/vocab-buddy/">GitHub</a>
        .
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
