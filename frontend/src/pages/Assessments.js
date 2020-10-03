import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Button } from "antd";
import { INK } from "../constants/colors";

const landingImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/assessments-landing.png?alt=media&token=168586ea-bb4e-499c-a711-5f3fe7a375b9";

const AssessmentsContainer = styled.div`
  display: flex;
  font-size: 56px;
  font-weight: bold;
  margin-top: 60px;
`;

const AssessmentsContainerMobile = styled.div`
  font-size: 56px;
  font-weight: bold;
  width: 100%;
`;

const Prompt = styled.div`
  font-size: 20px;
  font-weight: normal;
  margin-top: 20px;
`;

const LandingPageImage = styled.img`
  flex: 1;
  margin-top: 30px;
  width: 100%;
`;

const LandingPageText = styled.div`
  flex: 1;
  margin-left: 1em;
  margin-top: 120px;
`;

const BeginButtonMobile = styled(Button)`
  background: ${INK};
  border: none;
  border-radius: 12px;
  font-weight: bold;
  height: 50px;

  :hover {
    background: red;
  }
`;

const BeginButton = styled(BeginButtonMobile)`
  margin-top: 100px;
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
        <AssessmentsContainerMobile>
          <LandingPageImage src={landingImageUrl} alt="assessments-landing" />
          assessments
          <Prompt>Select the correct images to match the target words.</Prompt>
          <BeginButtonMobile block type="primary" size="large">
            begin
          </BeginButtonMobile>
        </AssessmentsContainerMobile>
      ) : (
        <AssessmentsContainer>
          <LandingPageImage src={landingImageUrl} alt="assessments-landing" />
          <LandingPageText>
            assessments
            <Prompt>
              Select the correct images to match the target words.
            </Prompt>
            <BeginButton type="primary" size="large">
              begin
            </BeginButton>
          </LandingPageText>
        </AssessmentsContainer>
      )}
    </Layout>
  );
};

export default Assessments;
