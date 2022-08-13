import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Nav from './Nav';

const Wrapper = styled.div`
  width: 100%;
`;

interface ContentProps {
  shouldAddPadding: boolean;
}

const Content = styled.main`
  height: 100vh;
  margin: ${({ shouldAddPadding }: ContentProps) => (shouldAddPadding ? '0 auto' : 0)};
  padding: ${({ shouldAddPadding }: ContentProps) => (shouldAddPadding ? '6em 2em 5em 3.5em' : 0)};
  width: 100%;
`;

interface LayoutProps {
  shouldAddPadding: boolean;
  hideBar: boolean;
  children: JSX.Element | string;
}

// Main layout of the project that includes both header and navbar
function Layout({
  hideBar = false,
  shouldAddPadding = true,
  children,
}: LayoutProps): ReactElement {
  return (
    <Wrapper>
      <Nav showsBar={!hideBar} />
      <Content shouldAddPadding={shouldAddPadding}>
        {children}
      </Content>
    </Wrapper>
  );
}

export default Layout;
