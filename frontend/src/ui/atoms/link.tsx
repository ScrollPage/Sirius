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
  color: ${({ isActive }) => (isActive ? '#1890ff' : '#000')};
  font-size: ${({ size }) => (size ? size : 16)}px;
  font-style: normal;
  font-weight: normal;
  line-height: 14px;
  &:hover {
    color: #1890ff;
  }
`;
