import styled from "@emotion/styled";

export const H1 = styled.h1<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
  line-height: 4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  user-select: none;
  font-family: Play;
`;

export const H2 = styled.h2<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-size: 1.5em;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  user-select: none;
  font-family: Play;
`;

export const H3 = styled.h3<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-size: 1.17em;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  user-select: none;
  font-family: Play;
`;