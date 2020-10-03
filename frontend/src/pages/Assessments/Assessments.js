import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { Button } from "antd";
import { INK, INK_HOVER } from "../../constants/colors";
import { ASSESSMENTS_LANDING } from "../../constants/images";

const AssessmentsContainer = styled.div`
  display: flex;
  font-weight: bold;

  @media (max-width: 600px) {
    flex-direction: column;
    font-size: 56px;
  }

  @media (min-width: 601px) {
    flex-direction: row;
    font-size: 4vw;
    margin-top: 60px;
  }
`;

const Prompt = styled.div`
  font-size: 20px;
  font-weight: normal;
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-top: 30px;
  width: 100%;
`;

const LandingPageImage = styled.img`
  width: 100%;
`;

const LandingPageText = styled.div`
  flex: 1;

  @media (min-width: 601px) {
    margin-left: 1em;
    margin-top: 60px;
  }
`;

const BeginButton = styled(Button)`
  background: ${INK};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  height: 50px;

  :hover {
    background: ${INK_HOVER};
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (min-width: 601px) {
    margin-top: 100px;
    width: 120px;
  }
`;

const Assessments = () => {
  return (
    <Layout>
      <AssessmentsContainer>
        <ImageContainer>
          <LandingPageImage
            src={ASSESSMENTS_LANDING}
            alt="assessments-landing"
          />
        </ImageContainer>
        <LandingPageText>
          assessments
          <Prompt>Select the correct images to match the target words.</Prompt>
          <BeginButton type="primary">begin</BeginButton>
        </LandingPageText>
      </AssessmentsContainer>
    </Layout>
  );
};

export default Assessments;
