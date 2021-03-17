import React from 'react';
import styled from '@emotion/styled';

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const MainTemplate: React.FC<Props> = ({ header, footer, children }) => (
  <MainContainer>
    {header && <Header>{header}</Header>}
    <Section>{children}</Section>
    {footer && <Footer>{footer}</Footer>}
  </MainContainer>
);

const MainContainer = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'section'
    'footer';
  flex-grow: 1;
`;

const Header = styled.header`
  grid-area: header;
  z-index: 1;
`;

const Section = styled.section`
  grid-area: section;
`;

const Footer = styled.footer`
  grid-area: footer;
`;
