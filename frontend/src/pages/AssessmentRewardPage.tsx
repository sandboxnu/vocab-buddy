import React, { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import CloudGroup from "../components/CloudGroup";
import PurpleButton from "../components/PurpleButton";
import { INK } from "../constants/colors";
import { ASSESSMENTS_LANDING } from "../constants/images";

interface AssessmentRewardPageProps {}

const Container = styled.div``;

const TitleContainer = styled.p`
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  padding-top: 20px;
  text-align: center;
`;

const SubtitleContainer = styled.p`
  font-family: Rubik;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  padding-top: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  padding-top: 30px;
  width: 100%;
  background: ${ASSESSMENTS_LANDING};
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  flex: 1;
`;

const AssessmentRewardPage = ({}: AssessmentRewardPageProps): ReactElement => {
  const history = useHistory();

  useEffect(() => {});

  return (
    <Layout>
      <Container>
        <TitleContainer>Congratulations!</TitleContainer>
        <SubtitleContainer>
          Click the button below to continue to dashboard.
        </SubtitleContainer>
        <ImageContainer>
          <Image src={ASSESSMENTS_LANDING} alt="image-landing" />
        </ImageContainer>
        <PurpleButton
          text={"back to dashboard"}
          onClick={() => {
            history.push("/dashboard");
          }}
        />
        <CloudGroup />
      </Container>
    </Layout>
  );
};

export default AssessmentRewardPage;
