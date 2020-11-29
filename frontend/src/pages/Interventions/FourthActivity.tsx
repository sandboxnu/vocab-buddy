import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import PromptSpeech from '../../components/PromptSpeech';
import ReplayButton from '../../components/ReplayButton';
import DelayedNextButton from '../../components/DelayedNextButton';
import CloudImage from '../../components/CloudImage';
import { SKY } from '../../constants/colors';
import { connect } from 'react-redux';
import { updateIntervention } from './data/actions';
import {
  getNextWordIdx,
  getNextActivityIdx,
} from '../../constants/utils';
import ExpandableImage from '../../components/ExpandableImage';

interface FourthActivityProps {
  title: string;
  setId: string;
  activityIdx: number;
  wordIdx: number;
  prompt: string;
  imageUrl: string;
  maxWordLength: number;
  updateIntervention: ({
    setId,
    wordIdx,
    activityIdx,
  }: {
    setId: string;
    wordIdx: number;
    activityIdx: number;
  }) => void;
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
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;

const WordTitle = styled.p`
  font-family: 'Rubik';
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

const Image = styled(ExpandableImage)`
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

const CloudImageLeft = styled(CloudImage)`
  position: absolute;
  left: 0;
  width: 15%;

  @media (max-width: 900px) {
    @media (max-height: 800px) {
      height: 0px;
    }
    width: 20%;
    bottom: 1.5em;
  }

  @media (min-width: 901px) {
    top: 30%;
  }
`;

const CloudImageRight = styled(CloudImage)`
  position: absolute;
  right: 0;
  width: 15%;
  @media (max-width: 900px) {
    top: 3em;
    width: 20%;
  }

  @media (min-width: 901px) {
    bottom: 30%;
  }
`;

const connector = connect(null, {
  updateIntervention: updateIntervention.request,
});

const FourthActivity = ({
  title,
  setId,
  activityIdx,
  wordIdx,
  prompt,
  imageUrl,
  maxWordLength,
  updateIntervention,
}: FourthActivityProps): ReactElement => {
  const nextWordIdx = getNextWordIdx(wordIdx, maxWordLength);
  const nextActivityIdx = getNextActivityIdx(
    activityIdx,
    wordIdx,
    maxWordLength
  );
  return (
    <Layout>
      <Container>
        <CloudImageLeft direction="left" />
        <CloudImageRight direction="right" />
        <MainContent>
          <DescriptionText>review with new picture</DescriptionText>
          <WordTitle>{title}</WordTitle>
          <Prompt>
            <PromptSpeech
              prompt={prompt}
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          <Image src={imageUrl} />
          <ButtonContainer>
            <DelayedNextButton
              text={'next'}
              top={20}
              delay={1000}
              onClick={() =>
                updateIntervention({
                  setId,
                  wordIdx: nextWordIdx,
                  activityIdx: nextActivityIdx,
                })
              }
            />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default connector(FourthActivity);
