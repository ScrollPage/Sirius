import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Box } from '@/src/ui';
import { LogoutModal } from '../organisms/logout-modal';
import { useEvent, useStore } from 'effector-react/ssr';
import { $modalKind, $modalProps, modalClosed } from '../model';

const modalComponents = {
  logout: LogoutModal,
};

export const MainModal = () => {
  const kind = useStore($modalKind);
  const props = useStore($modalProps);
  const modalClosedEvent = useEvent(modalClosed);

  useEffect(() => {
    if (kind) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [kind]);

  if (!kind) {
    return null;
  }

  const SpecificModal = modalComponents[kind];

  return (
    <>
      <Popup>
        <Box>
          <Close onClick={() => modalClosedEvent()} />
          <SpecificModal {...props} onClose={modalClosedEvent} />
        </Box>
      </Popup>
      <BackDrop />
    </>
  );
};

export const Popup = styled.div`
  position: fixed;
  z-index: 10;
  width: 600px;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  @media (max-width: 575.98px) {
    width: 90%;
    > div {
      padding: 40px 20px !important;
    }
  }
  ${Box} {
    flex: 1;
  }
`;
export const Close = styled.div`
  position: absolute;
  height: 18px;
  width: 18px;
  top: 30px;
  right: 30px;
  cursor: pointer;
  &:after,
  &:before {
    content: '';
    position: absolute;
    height: 29px;
    width: 1.5px;
    background-color: #000;
    top: 50%;
    left: 50%;
  }
  &:after {
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }
  &:before {
    transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  }
`;

export const BackDrop = styled.div`
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
