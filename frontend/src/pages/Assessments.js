import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Button } from "antd";
import { LIGHT_PURPLE, PURPLE } from "../constants/colors";

const AssessmentsContainer = styled.div`
  font-size: 56px;
  font-weight: bold;
  width: 56%;
  margin-left: 22%;
`;

const AssessmentsContainerShort = styled.div`
  font-size: 56px;
  font-weight: bold;
  width: 100%;
`;

const Prompt = styled.div`
  font-size: 24px;
  font-weight: normal;
`;

const LandingPageImage = styled.img`
  margin-top: 30px;
  width: 100%;
`;

const BeginButton = styled(Button)`
  background: ${PURPLE};
  border: none;
  border-radius: 12px;
  margin-top: 16px;
  height: 50px;

  :hover {
    background: red;
  }
`;

const BeginButtonShort = styled(BeginButton)`
  float: right;
  width: 120px;
`;

const Assessments = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeScreen = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <Layout>
      {screenWidth <= 600 ? (
        <AssessmentsContainerShort>
          Assessments
          <Prompt>Select the correct images to match the target words.</Prompt>
          <LandingPageImage
            src="https://www.stockvault.net/data/2007/03/01/102413/thumb16.jpg"
            alt="landscape"
          />
          <BeginButton block type="primary" size="large">
            Begin
          </BeginButton>
        </AssessmentsContainerShort>
      ) : (
        <AssessmentsContainer>
          Assessments
          <Prompt>Select the correct images to match the target words.</Prompt>
          <LandingPageImage
            src="https://www.stockvault.net/data/2007/03/01/102413/thumb16.jpg"
            alt="landscape"
          />
          <BeginButtonShort type="primary" size="large">
            Begin
          </BeginButtonShort>
        </AssessmentsContainer>
      )}
    </Layout>
  );
};

export default Assessments;
