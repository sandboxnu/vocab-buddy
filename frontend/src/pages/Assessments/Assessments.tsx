import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";
import { ASSESSMENTS_LANDING } from "../../constants/images";

const AssessmentsContainer = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: row;
  font-size: 4vw;
  margin-top: 60px;

  @media (max-width: 600px) {
    flex-direction: column;
    font-size: 40px;
    word-wrap: break-word;
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

  @media (min-width: 600px) {
    margin-left: 1em;
    margin-top: 60px;
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
          <PurpleButton text={"begin"} top={100} />
        </LandingPageText>
      </AssessmentsContainer>
    </Layout>
  );
};

export default Assessments;
