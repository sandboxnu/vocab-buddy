import React, {ReactElement, useEffect} from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import ReplayButton from '../../components/ReplayButton';
import PurpleButton from "../../components/PurpleButton";
import { SKY } from "../../constants/colors";
import AutoPrompt from "../../components/AutoPrompt";
import CloudImage from "../../components/CloudImage";


import { LikeFilled, DislikeFilled } from "@ant-design/icons";

interface ThirdActivityProps {
  title: string, // the word
  prompt: string,
  imageUrl: string,
  answer: boolean,
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const YesNoButton = styled(PurpleButton)`

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
  text-transfom: lowercase;
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
  justify-content: space-between;
`;

const YesNoContainer = styled.div`
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

const ThirdActivity  = ({ prompt, imageUrl, answer }: ThirdActivityProps) : ReactElement => {

  const nextButton = <PurpleButton text="next" top={20}/>;


  useEffect(() => {
    const timer = setTimeout(() => {
      // show nextbutton
    }, 15000);
    return () => clearTimeout(timer);
  })



  return (
      <Layout>
        <Container>
          <CloudImageLeft direction='left' />
          <CloudImageRight direction='right' />
          <MainContent>
            <DescriptionText>
              yes or no context question
            </DescriptionText>
            <WordTitle>
              {/* {title} */}
              minuscule
            </WordTitle>
            <Prompt>
              <AutoPrompt prompt="“Look at that miniscule ant! It is really, really, small.”" button={<ReplayButton scale={0.8}/>} />
            </Prompt>
            {/* <Image src={imageUrl}/> */}
            <Image src="https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/jSyyDnxzx41VFQNQbbEw%2Fminiscule2.png?alt=media&amp;token=f14c983c-6fff-475d-84ba-07b7b86ea2d5" />

            <ButtonContainer>
              <YesNoContainer>
                <PurpleButton text="yes" top={20} icon={<LikeFilled />}/>
                <PurpleButton text={"no"} top={20} icon={<DislikeFilled />}/>
              </YesNoContainer>

              {nextButton}
            </ButtonContainer>

          </MainContent>
        </Container>
      </Layout>);
}

export default ThirdActivity;