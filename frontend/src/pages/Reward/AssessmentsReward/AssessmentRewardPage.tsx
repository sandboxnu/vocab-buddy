import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import CloudGroup from '../../../components/CloudGroup';
import PurpleButton from '../../../components/PurpleButton';
import { ASSESSMENTS_LANDING } from '../../../constants/images';

const Container = styled.div``;

const TitleContainer = styled.p`
  font-family: Rubik;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  margin: 20px 0 0 0;
  text-align: center;
  text-transform: lowercase;
`;

const SubtitleContainer = styled.p`
  font-family: Rubik;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: center;
  text-transform: lowercase;
`;

const ImageContainer = styled.div`
  display: flex;
  padding-top: 30px;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
    flex: 1;
  }
`;

const Image = styled.img`
  @media (max-width: 900px) {
    width: 100%;
    flex: 1;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
function AssessmentRewardPage(): ReactElement {
  const navigate = useNavigate();

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
        <ButtonContainer>
          <PurpleButton
            padding={5}
            top={20}
            text="back to dashboard"
            onClick={() => {
              navigate('/dashboard');
            }}
          />
        </ButtonContainer>
        <CloudGroup />
      </Container>
    </Layout>
  );
}

export default AssessmentRewardPage;
