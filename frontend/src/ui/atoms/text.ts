import styled from '@emotion/styled';

export const Text = styled.div<{ size: number }>`
  font-size: ${({ size }) => size && size}px;
  font-family: Play;
`;