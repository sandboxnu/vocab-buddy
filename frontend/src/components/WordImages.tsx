import React, { FunctionComponent, ReactElement } from "react";
import styled from "styled-components";
import { SKY } from "../constants/colors";

interface ImagesProp {
  images: string[];
  setSelected: (index: number) => void;
  selected: number;
}

interface ImageProp {
  highlight: boolean;
}

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${({ highlight }: ImageProp) =>
    highlight &&
    `
    border: 10px solid ${SKY};
  `};
`;

const WordImages: FunctionComponent<ImagesProp> = ({
  images,
  setSelected,
  selected,
}): ReactElement => {
  const selectIndex = (idx: number) => {
    setSelected(idx);
  };
  return (
    <>
      {images.map((img: string, idx: number) => {
        return (
          <Image
            src={img}
            key={idx}
            highlight={selected === idx}
            onClick={() => selectIndex(idx)}
          />
        );
      })}
    </>
  );
};

export default WordImages;
