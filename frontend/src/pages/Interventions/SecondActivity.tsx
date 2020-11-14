import React, { ReactElement, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { CORAL, SKY } from "../../constants/colors";
import PromptSpeech from "../../components/PromptSpeech";
import ReplayButton from "../../components/ReplayButton";
import PurpleButton from "../../components/PurpleButton";

interface SecondActivityProps {
  title: string;
  correctUrl: string;
  incorrectUrl: string;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const UnselectedImage = styled.img`
  border-radius: 20px;
  margin: 20px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const CorrectImage = styled.img`
  border-radius: 20px;
  margin: 20px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  border: 10px solid ${CORAL};
`;

const IncorrectImage = styled.img`
  border-radius: 20px;
  margin: 20px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  border: 10px solid ${SKY};
`;

const correctUrl = {
  url:
    "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/jSyyDnxzx41VFQNQbbEw%2Fminiscule3.png?alt=media&token=cb4f4cf6-a1d0-465d-a972-087230d2ff05",
  correct: true,
};

const incorrectUrl = {
  url:
    "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/jSyyDnxzx41VFQNQbbEw%2Fminiscule1.png?alt=media&token=cbf2618d-68c1-48a1-9fc1-f46f6284d761",
  correct: false,
};

const imageUrls = [correctUrl, incorrectUrl];

interface ImageProps {
  url: string;
  correct: boolean;
  selected: boolean;
  onClick: () => void;
}

const Image = ({
  url,
  correct,
  selected,
  onClick,
}: ImageProps): ReactElement => {
  if (selected && correct) return <CorrectImage src={url} onClick={onClick} />;
  else if (selected && !correct)
    return <IncorrectImage src={url} onClick={onClick} />;
  else return <UnselectedImage src={url} onClick={onClick} />;
};

const SecondActivity = ({
  title,
  correctUrl,
  incorrectUrl,
}: SecondActivityProps): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Layout>
      <Container>
        <MainContent>
          <DescriptionText>example vs. non-example</DescriptionText>
          <WordTitle>
            {/* {title} */}
            Miniscule
          </WordTitle>
          <Prompt>
            <PromptSpeech
              prompt="Miniscule. Touch the picture that shows miniscule."
              button={<ReplayButton scale={0.8} />}
            />
          </Prompt>
          {imageUrls.map((img, index) => (
            <Image
              url={img.url}
              correct={img.correct}
              selected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
          <ButtonContainer>
            <PurpleButton text="next" top={20} />
          </ButtonContainer>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default SecondActivity;
