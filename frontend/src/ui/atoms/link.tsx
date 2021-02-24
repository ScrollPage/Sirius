import React from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  size?: number;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  isActive,
  size,
}) => {
  return (
    <NextLink href={href}>
      <StyledA size={size} isActive={isActive}>
        {children}
      </StyledA>
    </NextLink>
  );
};

const StyledA = styled.a<{ isActive?: boolean; size?: number }>`
  font-style: normal;
  font-weight: normal;
  font-size: ${({ size }) => (size ? size : 16)}px;
  line-height: 14px;
  color: #000;
  &:hover {
    color: blue;
  }
`;
