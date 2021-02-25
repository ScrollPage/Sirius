import React from 'react';
import styled from '@emotion/styled';
import { Container, Link } from '@/src/ui';
import { useRouter } from 'next/router';
import { $isAuthenticated, logout } from '../model/token';
import { useEvent, useStore } from 'effector-react/ssr';
import { modalOpened } from '../../modal';

export const Header: React.FC = () => {
  const isAuthenticated = useStore($isAuthenticated);
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Nav>
            <NavLink href="/" label="Главная" />
            {isAuthenticated && <NavLink href="/cabinet" label="Данные" />}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <LogoutLink />
            ) : (
              <>
                <NavLink href="/login" label="Вход" />
                <NavLink href="/register" label="Регистрация" />
              </>
            )}
          </Nav>
        </Inner>
      </Container>
    </Wrapper>
  );
};

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

const LogoutLink: React.FC = () => {
  const logoutEvent = useEvent(logout);
  const modalOpenedEvent = useEvent(modalOpened);

  const openHandler = () => {
    modalOpenedEvent({
      kind: 'logout',
      props: {
        onLogout: logoutEvent,
      },
    });
  };
  return <LogoutWrapper onClick={openHandler}>Выход</LogoutWrapper>;
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

const LogoutWrapper = styled.div`
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;
