import styled from "@emotion/styled";

export const H1 = styled.h1<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-style: normal;
  font-weight: 600;
  line-height: 4rem;
  margin-top: 6rem;
  margin-bottom: 2rem;
  user-select: none;
  font-family: Play;
`;

export const H2 = styled.h2<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
  user-select: none;
  font-family: Play;
`;

export const H3 = styled.h3<{ center?: boolean }>`
  ${({ center }) => center && 'text-align: center;'}
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  user-select: none;
  font-family: Play;
`;