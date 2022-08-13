import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CloudImageProps {
  direction: 'left' | 'right';
  className: string;
}
const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/cloud-right.png?alt=media&token=57c60ff8-d637-4ec8-80a7-5a9f1bd1ba56';

const ImageView = styled.img`
  -webkit-transform: scaleX(
    ${({ direction }: CloudImageProps) => (direction === 'right' ? 1 : -1)}
  );
  transform: scaleX(
    ${({ direction }: CloudImageProps) => (direction === 'right' ? 1 : -1)}
  );
`;
function CloudImage({
  direction,
  className = '',
}: CloudImageProps): ReactElement {
  return (
    <ImageView
      className={className}
      direction={direction}
      src={imageUrl}
    />
  );
}

export default CloudImage;
