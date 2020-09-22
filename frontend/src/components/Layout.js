import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { singleRequest } from "../data/actions";
import { LIGHT_PURPLE } from "../constants/colors";
import { Button } from "antd";

const Wrapper = styled.div`
  width: 100%;
`;

const NavBarContainer = styled.nav`
  background-color: ${LIGHT_PURPLE};
  // height: 50px;
  position: fixed;
  width: 100%;
`;

// An example of using a connector
const connector = connect((state) => ({}), {
  request: singleRequest.request,
});

const Layout = () => {
  return (
    <Wrapper>
      <Button type="primary">Primary Button</Button>
      <NavBarContainer></NavBarContainer>
    </Wrapper>
  );
};

export default connector(Layout);
