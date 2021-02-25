import React, { FormEvent } from 'react';
import { DatePicker, Select } from 'antd';
import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { registerFetching, registerForm } from './model';
import { useStore } from 'effector-react/ssr';
import { useForm } from 'effector-forms';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

function disabledDate(current) {
  return current && current > moment().endOf('day');
}

export const RegisterContainer = () => {
  const { submit, eachValid, fields } = useForm(registerForm);
  const isLoading = useStore(registerFetching.isLoading);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };
  return (
    <Container>
      <H3 center>Регистрация</H3>
      <form onSubmit={onSubmit}>
        <Col align="center">
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
          <Input
            field={registerForm.fields.email}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <Input
            field={registerForm.fields.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <Select
            style={{ width: 218, marginBottom: '21px' }}
            value={fields.sex.value}
            onChange={(value) => fields.sex.onChange(value)}
          >
            <Option value="0">Пацан</Option>
            <Option value="1">Девочка</Option>
          </Select>
          <DatePicker
            style={{ width: 218, marginBottom: '21px' }}
            format={dateFormat}
            disabledDate={disabledDate}
            value={moment(fields.birth_date.value, dateFormat)}
            onChange={(_, value) => fields.birth_date.onChange(value)}
          />
          <Button type="submit" disabled={isLoading || !eachValid}>
            Подтвердить
          </Button>
          <Row justify="center" mx="20px">
            <Link href="/login">Войти</Link>
          </Row>
        </Col>
      </form>
    </Container>
  );
};
