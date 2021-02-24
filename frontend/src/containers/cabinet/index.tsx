import { $session, chechAuthState } from '@/src/features/common';
import { logout } from '@/src/features/common';
import { modalOpened } from '@/src/features/modal';
import { Col } from '@/src/lib/styled-components-layout';
import { Box, Button, H3 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useStore, useEvent } from 'effector-react/ssr';
import React, { useEffect } from 'react';

export const CabinetContainer = () => {
  const user = useStore($session);
  const logoutEvent = useEvent(logout);
  const chechAuthStateEvent = useEvent(chechAuthState);
  const modalOpenedEvent = useEvent(modalOpened);

  const openHandler = () => {
    modalOpenedEvent({
      kind: 'logout',
      props: {
        onLogout: logoutEvent,
      },
    });
  };

  useEffect(() => {
    chechAuthStateEvent();
  }, []);

  return (
    <Container>
      <Box>
        <Col align="center">
          <H3 center>Вас зовут: {user?.name}</H3>
          <Button onClick={openHandler}>Выйти</Button>
        </Col>
      </Box>
    </Container>
  );
};
