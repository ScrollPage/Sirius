import React, { FormEvent } from 'react';
import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { H3, Button, Link } from '@/src/ui/atoms';
import { registerFetching, registerForm } from './model';
import { useStore } from 'effector-react/ssr';
import { useField, useForm } from 'effector-forms';
import format from 'dayjs';
import { DatePicker } from '@/src/ui';
import Select from 'antd/lib/select';
import { Field } from 'effector-forms/dist/types';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

const { Option } = Select;

export const RegisterContainer = () => {
  const { submit, eachValid } = useForm(registerForm);
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
          <RegisterSelect field={registerForm.fields.sex} />
          <RegisterDatePicker field={registerForm.fields.birth_date} />
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

interface PropsWIthField {
  field: Field<any>;
}

const RegisterSelect: React.FC<PropsWIthField> = ({ field }) => {
  const { value, onChange } = useField(field);
  return (
    <Select
      placeholder="Выберите пол"
      style={{ width: 218, marginBottom: '21px' }}
      value={value ? value : undefined}
      onChange={(value) => onChange(value)}
    >
      <Option value="0">Пацан</Option>
      <Option value="1">Девочка</Option>
    </Select>
  );
};

const dateFormat = 'YYYY-MM-DD';

function disabledDate(current) {
  return current && current > format().endOf('day');
}

const RegisterDatePicker: React.FC<PropsWIthField> = ({ field }) => {
  const { value, onChange } = useField(field);
  return (
    <ConfigProvider locale={ruRU}>
      <DatePicker
        style={{ width: 218, marginBottom: '21px' }}
        format={dateFormat}
        disabledDate={disabledDate}
        value={value ? format(value, dateFormat) : undefined}
        onChange={(_, value) => onChange(value)}
      />
    </ConfigProvider>
  );
};
