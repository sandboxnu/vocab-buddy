import React, { FunctionComponent, ReactElement, useState } from "react";
import styled from "styled-components";
import { SEA_FOAM } from "../constants/colors";


interface ImageProp {
  highlight?: boolean,
  src?: string,
}

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${(prop: ImageProp) => prop.highlight && `
    border: 10px solid ${SEA_FOAM};
  `};
`;

const ImageComponent: FunctionComponent<ImageProp> = ({ src })  : ReactElement => {
  let [selected, setSelected] = useState(false);

  return (<Image src={src} highlight={selected} onClick={() => setSelected(!selected)} />
  );
};

export default ImageComponent;
