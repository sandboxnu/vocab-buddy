import React, { ReactElement } from "react";
import styled from "styled-components";
import Blocker from "../../components/Blocker";
import Layout from "../../components/Layout";
import PromptSpeech from "../../components/PromptSpeech";
import PurpleButton from "../../components/PurpleButton";
import ReplayButton from '../../components/ReplayButton';
import { SKY } from "../../constants/colors";
import { connect } from "react-redux";
import { updateIntervention } from "./data/actions"; 
import { getNextActivityIdx } from "../../constants/utils";
import { getCurrentInterventionWordIdx, getCurrentInterventionActivityIdx } from "./data/reducer"; 

interface FirstActivityProps {
  title: string;
  imageUrl: string;
  wordIdx: number,
  activityIdx: number, 
  updateIntervention: ({ wordIdx, activityIdx }: {wordIdx: number, activityIdx: number}) => void,
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


const connector = connect(
  (state) => ({
    wordIdx: getCurrentInterventionWordIdx(state),
    activityIdx: getCurrentInterventionActivityIdx(state),
  }),
  {
    updateIntervention: updateIntervention.request,
  }
);

const FirstActivity = ({
  title,
  imageUrl,
  wordIdx, 
  activityIdx,
  updateIntervention,
}: FirstActivityProps): ReactElement => {
  
  const nextActivityIdx = getNextActivityIdx(activityIdx);

  return (
    <Layout>
      <Container>
        <MainContent>
          <DescriptionText>introduction + definition</DescriptionText>
          <WordTitle>
            {title}
          </WordTitle>
          <Prompt>
            <PromptSpeech
              prompt="Look at that miniscule ant! It is really, really, small."
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          <Image src={imageUrl}/>
          <ButtonContainer>
            <Blocker afterSeconds={5} message='Click on the next button to continue' repeatable={false}>
              <PurpleButton text={"next"} top={20} onClick={() => updateIntervention({wordIdx, activityIdx: nextActivityIdx})} />
            </Blocker>
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(FirstActivity);
