import React from 'react';
import styled from '@emotion/styled';
import { Container, Link } from '@/src/ui';
import { useRouter } from 'next/router';

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Nav>
            <NavLink href="/" label="Главная" />
            <NavLink href="/cabinet" label="Данные" />
          </Nav>
        </Inner>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const Nav = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  > * + * {
    margin-left: 1rem;
  }
`;

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const { pathname } = useRouter();

  return (
    <Link href={href} isActive={pathname === href}>
      {label}
    </Link>
  );
};
