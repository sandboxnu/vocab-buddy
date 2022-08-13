import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { CLOUD, LOGIN_BACKGROUND } from '../constants/colors';
import Layout from './Layout';
import PurpleButton from './PurpleButton';

const LandingPageContainer = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: row;
  font-size: 4vw;
  min-height: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    font-size: 40px;
    word-wrap: break-word;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding-top: 30px;
  width: 100%;
  background: ${LOGIN_BACKGROUND};
  display: flex;
  align-items: center;
`;

const LandingPageImage = styled.img`
  width: 100%;
  flex: 1;
`;

const LandingPageText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left: 1em;
  margin-right: 1em;
`;

const LandingPageTextHolder = styled.div`
  margin: auto;
`;

const Prompt = styled.p`
  display: block;
  background-color: ${CLOUD};
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 20px;
  font-weight: normal;
`;

interface LandingPageProps {
  image: string;
  title: string;
  subtitle: string;
  onBegin: () => void;
}

const LandingPage: FunctionComponent<LandingPageProps> = ({
  image,
  title,
  subtitle,
  onBegin,
}): ReactElement => {
  return (
    <Layout shouldAddPadding={false}>
      <LandingPageContainer>
        <ImageContainer>
          <LandingPageImage src={image} alt="image-landing" />
        </ImageContainer>
        <LandingPageText>
          <LandingPageTextHolder>
            {title}
            <Prompt>{subtitle}</Prompt>
            <PurpleButton
              text={'begin'}
              top={100}
              onClick={onBegin}
            />
          </LandingPageTextHolder>
        </LandingPageText>
      </LandingPageContainer>
    </Layout>
  );
};

export default LandingPage;
