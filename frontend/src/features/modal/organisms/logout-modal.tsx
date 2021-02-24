import React from 'react';
import { DefaultModal, DefaultModalProps } from '../molecules/default-modal';

interface LogoutModalProps extends DefaultModalProps {
  onLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  onClose,
  onLogout,
}) => {
  return (
    <DefaultModal title="Выход" onClose={onClose} onDelete={onLogout}>
      Do you really want to leave?
    </DefaultModal>
  );
};
