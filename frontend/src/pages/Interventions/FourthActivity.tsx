import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PromptSpeech from "../../components/PromptSpeech";
import ReplayButton from "../../components/ReplayButton";
import PurpleButton from "../../components/PurpleButton";
import { SKY } from "../../constants/colors";
import { connect } from "react-redux";
import { updateIntervention } from "./data/actions"; 
import { 
  // getNextWordIdx, 
  getNextActivityIdx } from "../../constants/utils";
import { 
  // getCurrentInterventionWordIdx, 
  getCurrentInterventionActivityIdx } from "./data/reducer"; 

interface FourthActivityProps {
  title: string;
  imageUrl: string;
  // wordIdx: number,
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
    // wordIdx: getCurrentInterventionWordIdx(state),
    activityIdx: getCurrentInterventionActivityIdx(state),
  }),
  {
    updateIntervention: updateIntervention.request,
  }
);

const FourthActivity = ({
  title,
  imageUrl,
  // wordIdx, 
  activityIdx,
  updateIntervention,
}: FourthActivityProps): ReactElement => {
  const nextActivityIdx = getNextActivityIdx(activityIdx);
  // const nextWordIdx = getNextWordIdx(wordIdx);
  return (
    <Layout>
      <Container>
        <MainContent>
          <DescriptionText>review with new picture</DescriptionText>
          <WordTitle>
            {title}
          </WordTitle>
          <Prompt>
            <PromptSpeech
              prompt="Say, miniscule means really, really small"
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          <Image src={imageUrl}/>
          <ButtonContainer>
            // TODO: change 0 to nextWordIdx
            <PurpleButton text={"next"} top={20} onClick={() => updateIntervention({wordIdx: 0, activityIdx: nextActivityIdx})} />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(FourthActivity);
