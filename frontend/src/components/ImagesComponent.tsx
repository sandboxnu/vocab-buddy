import React, { FunctionComponent, ReactElement, useState } from "react";
import styled from "styled-components";
import { SEA_FOAM } from "../constants/colors";


interface ImagesProp {
  images: string[],
}

interface ImageProp {
  highlight: boolean,
}

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${({highlight}: ImageProp) => highlight && `
    border: 10px solid ${SEA_FOAM};
  `};
`;

const ImagesComponent: FunctionComponent<ImagesProp> = ({ images })  : ReactElement => {
  let [selected, setSelected] = useState(-1);
  return (
    <>
    {images.map((img: string, idx: number) => {
      return (<Image src={img} key={idx} highlight={selected===idx} onClick={() => setSelected(idx)} />)})}
    </>
  );
};

export default ImagesComponent;
