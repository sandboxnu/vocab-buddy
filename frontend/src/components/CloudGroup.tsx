import React, { ReactElement } from "react";
import styled from "styled-components";
import CloudImage from "./CloudImage";

const CloudImageLeft = styled(CloudImage)`
  position: absolute;
  left: 0;
  width: 15%;

  @media (max-width: 900px) {
    @media (max-height: 800px) {
      height: 0px;
    }
    width: 20%;
    bottom: 1.5em;
  }
  @media (min-width: 901px) {
    top: 30%;
  }
`;

const CloudImageRight = styled(CloudImage)`
  position: absolute;
  right: 0;
  width: 15%;
  @media (max-width: 900px) {
    top: 3em;
    width: 20%;
  }
  @media (min-width: 901px) {
    bottom: 30%;
  }
`;

const CloudGroup = (): ReactElement => {
  return (
    <>
      <CloudImageLeft direction="left" />
      <CloudImageRight direction="right" />
    </>
  );
};

export default CloudGroup;
