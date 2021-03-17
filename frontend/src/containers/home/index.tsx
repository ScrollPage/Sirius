import { Row } from '@/src/lib/styled-components-layout';
import { Container, H3, Link } from '@/src/ui';
import React from 'react';

export const HomeContainer = () => {
  return (
    <Container>
      <H3 center>Главная</H3>
      <Row justify="center" mx="100px" gap="50px">
        <Link href="/login">Войти</Link>
        <Link href="/register">Зарегистрироваться</Link>
      </Row>
    </Container>
  );
};
