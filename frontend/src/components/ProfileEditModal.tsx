import Modal from 'antd/lib/modal/Modal';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { SEA_FOAM } from '../constants/colors';
import { allProfileIcons } from '../firebase/firebaseInteractor';

interface ProfileEditModalProps {
  currentIcon: string;
  showModal: boolean;
  onClose: () => void;
  changeIconRequest: (url: string) => void;
}

interface ProfileIconProps {
  highlight: boolean;
}

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const ProfileIcon = styled.img`
  border-radius: 50%;
  ${({ highlight }: ProfileIconProps) => highlight && `border: 3px solid ${SEA_FOAM};`}

  :hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProfileEditModal: FunctionComponent<ProfileEditModalProps> = ({
  currentIcon,
  onClose,
  showModal,
  changeIconRequest,
}) => {
  const [selected, setSelected] = useState(currentIcon);

  const onOkHandler = (url: string) => {
    onClose();
    changeIconRequest(url);
  };

  return (
    <Modal
      title="change profile icon"
      destroyOnClose
      onCancel={onClose}
      visible={showModal}
      okText="save"
      cancelText="cancel"
      onOk={() => onOkHandler(selected)}
    >
      <IconsContainer>
        {allProfileIcons.map((url) => (
          <ProfileIcon
            src={url}
            onClick={() => setSelected(url)}
            highlight={url === selected}
          />
        ))}
      </IconsContainer>
    </Modal>
  );
};

export default ProfileEditModal;
