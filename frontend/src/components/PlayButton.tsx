import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { INK_RGBA } from '../constants/colors';

const TriangleButton = styled.svg`
  ${(props) =>
    `
    transform: scale(${props.scale});
  `}
  path: hover {
    cursor: pointer;
    fill: ${INK_RGBA(0.8)};
  }
`;

interface PlayButtonProps {
  scale?: number;
  onClickHandler: () => void;
}

const PlayButton: FunctionComponent<PlayButtonProps> = ({
  scale,
  onClickHandler,
}: PlayButtonProps) => {
  return (
    <TriangleButton
      scale={scale}
      onClick={onClickHandler}
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15.636V2.60224C0 0.618846 2.14373 -0.635955 3.88299 0.335504L15.3702 6.89285L26.6956 13.4097C28.4348 14.4217 28.4348 16.9313 26.6956 17.9432L15.3297 24.4196L3.88299 30.9365C2.14373 31.9484 0 30.6936 0 28.6697V15.636Z"
        fill="#615EF7"
      />
    </TriangleButton>
  );
};

export default PlayButton;
