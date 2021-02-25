import { $session } from '@/src/features/common';
import { Col } from '@/src/lib/styled-components-layout';
import { H3 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useStore } from 'effector-react/ssr';
import React from 'react';

export const CabinetContainer = () => {
  const user = useStore($session);
  return (
    <Container>
      <Col align="center">
        <H3 center>Вас зовут: {user?.first_name}</H3>
      </Col>
    </Container>
  );
};
