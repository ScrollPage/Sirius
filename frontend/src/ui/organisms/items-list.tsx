import React from 'react';
import styled from '@emotion/styled';

export const ItemsList = ({ items, render }) => (
  <Items>{items.map((item) => render(item))}</Items>
);

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
