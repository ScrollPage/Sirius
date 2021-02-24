import React from 'react';
import styled from '@emotion/styled';
import { H2 } from '@/src/ui/atoms/title';
import { Button } from '@/src/ui';

export interface DefaultModalProps {
  onClose: () => void;
}

interface DefaultModalType {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onDelete?: () => void;
}

export const DefaultModal: React.FC<DefaultModalType> = ({
  title,
  children,
  onClose,
  onDelete,
}) => {
  const onDeleteHandler = () => {
    onDelete();
    onClose();
  };

  return (
    <GridPopUp>
      <CellTitle>
        <H2>{title}</H2>
      </CellTitle>

      <CellContent>{children}</CellContent>

      {onDelete && (
        <CellButtonYes>
          <Button width="100%" onClick={onDeleteHandler}>
            Yes
          </Button>
        </CellButtonYes>
      )}

      {onClose && (
        <CellButtonNo>
          <Button width="100%" onClick={onClose}>
            No
          </Button>
        </CellButtonNo>
      )}
    </GridPopUp>
  );
};

const GridPopUp = styled.div`
  display: grid;
  grid-template-rows: 2rem 1fr 2rem;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-gap: 1rem;
  grid-template-areas:
    'popupTitle popupTitle'
    'popupContent popupContent'
    'popupButtonYes popupButtonNo';
`;

const CellTitle = styled.div`
  grid-area: popupTitle;
  ${H2} {
    text-align: center;
    margin: 0;
  }
`;

const CellContent = styled.div`
  grid-area: popupContent;
  padding: 30px 0;
`;

const CellButtonYes = styled.div`
  grid-area: popupButtonYes;
`;

const CellButtonNo = styled.div`
  grid-area: popupButtonNo;
`;
