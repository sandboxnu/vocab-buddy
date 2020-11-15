import React, { ReactElement } from "react";
import styled from "styled-components";
import Blocker from "../../components/Blocker";
import Layout from "../../components/Layout";
import PromptSpeech from "../../components/PromptSpeech";
import PurpleButton from "../../components/PurpleButton";
import ReplayButton from '../../components/ReplayButton';
import { SKY } from "../../constants/colors";

interface FirstActivityProps {
  title: string;
  imageUrl: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContent = styled.div`
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const DescriptionText = styled.p`
  color: #666;
  font-family: "Rubik";
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;

const WordTitle = styled.p`
  font-family: "Rubik";
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Prompt = styled.div`
  align-items: center;
  background-color: ${SKY};
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  padding: 1px 5px;
  width: max-content;
`;

const Image = styled.img`
  border-radius: 20px;
  min-width: 600px;

  @media (max-width: 900px) {
    min-width: unset;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const FirstActivity = ({
  title,
  imageUrl,
}: FirstActivityProps): ReactElement => {
  return (
    <Layout>
      <Container>
        <MainContent>
          <DescriptionText>introduction + definition</DescriptionText>
          <WordTitle>
            {/* {title} */}
            Miniscule
          </WordTitle>
          <Prompt>
            <PromptSpeech
              prompt="Look at that miniscule ant! It is really, really, small."
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          {/* <Image src={imageUrl}/> */}
          <Image src="https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/jSyyDnxzx41VFQNQbbEw%2Fminiscule2.png?alt=media&amp;token=f14c983c-6fff-475d-84ba-07b7b86ea2d5" />
          <ButtonContainer>
            <Blocker afterSeconds={5} message='Click on the next button to continue' repeatable={false}>
              <PurpleButton text={"next"} top={20}/>
            </Blocker>
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default FirstActivity;
