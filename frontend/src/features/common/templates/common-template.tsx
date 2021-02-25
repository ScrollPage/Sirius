import React from 'react';
import styled from '@emotion/styled';

import { MainTemplate } from '@/src/ui/templates';
import { Header } from '../organisms';

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const CommonContentTemplate: React.FC<Props> = ({
  header,
  children,
}) => (
  <MainTemplate header={header}>
    <CommonContent>{children}</CommonContent>
  </MainTemplate>
);

CommonContentTemplate.defaultProps = {
  header: <Header />,
};

export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding-top: 30px;
`;
