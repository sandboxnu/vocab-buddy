import { Button } from 'antd';
import React, { MouseEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { INK, INK_HOVER } from '../constants/colors';

interface PurpleButtonProps {
  top?: number;
  text?: string | '';
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  check?: ReactElement;
  icon?: ReactElement;
  className: string;
  padding?: number;
  disabled?: boolean;
}

const ButtonContainer = styled(Button)`
  background: ${INK} !important;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  height: 50px;
  margin-bottom: 20px;
  min-width: 120px;
  padding: 0 ${({ padding }: PurpleButtonProps) => padding}em;

  margin-top: ${(prop: PurpleButtonProps) => prop.top}px;
  span {
    color: #fff;
  }

  :focus {
    background: ${INK};
  }

  :hover {
    background: ${INK_HOVER} !important;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const PurpleButton = ({
  className = '',
  text,
  top,
  onClick,
  icon,
  check,
  padding,
  disabled,
}: PurpleButtonProps): ReactElement => {
  return (
    <ButtonContainer
      className={className}
      top={top}
      onClick={onClick}
      padding={padding}
      disabled={disabled}
    >
      {check}
      {text}
      {icon}
    </ButtonContainer>
  );
};

PurpleButton.defaultProps = {
  className: '',
};

export default PurpleButton;
