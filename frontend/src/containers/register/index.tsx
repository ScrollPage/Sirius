import React, { FormEvent } from 'react';
import { Select } from 'antd';
import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { registerFetching, registerForm } from './model';
import { useStore } from 'effector-react/ssr';
import { useForm } from 'effector-forms';

const { Option } = Select;

export const RegisterContainer = () => {
  const { submit, eachValid, isDirty, fields } = useForm(registerForm);
  const isLoading = useStore(registerFetching.isLoading);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };
  return (
    <Container>
      <Box>
        <H3 center>Регистрация</H3>
        <form onSubmit={onSubmit}>
          <Col>
            <Row justify="center" gap="40px">
              <Col>
                <Input
                  field={registerForm.fields.name}
                  type="text"
                  name="name"
                  placeholder="Название"
                />
                <Input
                  field={registerForm.fields.company}
                  type="text"
                  name="company"
                  placeholder="Предприятие"
                />
                <Input
                  field={registerForm.fields.first_name}
                  type="text"
                  name="first_name"
                  placeholder="Имя"
                />
                <Input
                  field={registerForm.fields.last_name}
                  type="text"
                  name="last_name"
                  placeholder="Фамилия"
                />
              </Col>
              <Col>
                <Input
                  field={registerForm.fields.email}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <Input
                  field={registerForm.fields.phone_number}
                  type="text"
                  name="phone_number"
                  placeholder="Номер телефона"
                  isPhoneNumber
                />
                <Input
                  field={registerForm.fields.password}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                />
                <Select
                  value={fields.role.value}
                  style={{ width: 218, marginBottom: '21px' }}
                  onChange={(value) => fields.role.onChange(value)}
                >
                  <Option value="1">Я стейкхолдер</Option>
                  <Option value="2">Я заказчик</Option>
                  <Option value="3">Я бизнец-инициатива</Option>
                </Select>
              </Col>
            </Row>
            <Row justify="center">
              <Button type="submit" disabled={isLoading || !eachValid}>
                Подтвердить
              </Button>
            </Row>
            <Row justify="center" mt="30px">
              <Link href="/login">Войти</Link>
            </Row>
          </Col>
        </form>
      </Box>
    </Container>
  );
};
