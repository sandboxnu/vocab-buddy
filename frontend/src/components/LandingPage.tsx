import React, { FunctionComponent, ReactElement } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import PurpleButton from "./PurpleButton";

const LandingPageContainer = styled.div`
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

interface LandingPageProps {
    image: string;
    title: string;
    subtitle: string;
    onBegin: () => void;
}

const LandingPage : FunctionComponent<LandingPageProps> = ({ image, title, subtitle, onBegin }) : ReactElement => {
  return (
      <Layout>
      <LandingPageContainer>
        <ImageContainer>
          <LandingPageImage
            src={image}
            alt="image-landing"
          />
        </ImageContainer>
        <LandingPageText>
          {title}
          <Prompt>{subtitle}</Prompt>
          <PurpleButton text={"begin"} top={100} onClick={() => onBegin()} />
        </LandingPageText>
      </LandingPageContainer>
    </Layout>
  );
};

export default LandingPage;