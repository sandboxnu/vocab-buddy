import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Layout = styled.div`
`;

// Example of using a connector
const connector = connect(
  (state) => ({
  }),
  {  },
);

const Layout = ({
}) => {
  return (
    <Layout>
      Welcome to vocab buddy
    </Layout>
  );
}

export default Layout;
