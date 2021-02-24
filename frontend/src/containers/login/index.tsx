import React, { FormEvent } from 'react';
import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { loginFetching, loginForm } from './model';
import { useStore } from 'effector-react/ssr';
import { useForm } from 'effector-forms';

export const LoginContainer = () => {
  const { submit, eachValid } = useForm(loginForm);
  const isLoading = useStore(loginFetching.isLoading);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Container>
      <Box>
        <H3 center>Логин</H3>
        <form onSubmit={onSubmit}>
          <Col align="center">
            <Input
              field={loginForm.fields.email}
              type="email"
              placeholder="Введите Email"
            />
            <Input
              field={loginForm.fields.password}
              type="password"
              placeholder="Введите пароль"
            />
            <Button type="submit" disabled={isLoading || !eachValid}>
              Войти
            </Button>
            <Row justify="center" mt="30px">
              <Link href="/register">Зарегистрироваться</Link>
            </Row>
          </Col>
        </form>
      </Box>
    </Container>
  );
};
