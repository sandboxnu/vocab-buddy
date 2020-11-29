import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface ExpandableImageProps {
  src: string;
  className: string;
}

interface ClickedProps {
  isExpanded: boolean;
}

const Image = styled.img`
  transform: scale(
    ${({ isExpanded: isShrunk }: ClickedProps) =>
      isShrunk ? 1.1 : 1}
  );
  transition: transform 0.5s;
`;

const ExpandableImage = ({
  className = '',
  src,
}: ExpandableImageProps): ReactElement => {
  let [isExpanded, setIsExpanded] = useState(false);
  return (
    <Image
      src={src}
      onClick={() => setIsExpanded(true)}
      onTransitionEnd={() => setIsExpanded(false)}
      isExpanded={isExpanded}
    />
  );
};

ExpandableImage.defaultProps = {
  className: '',
};

export default ExpandableImage;
