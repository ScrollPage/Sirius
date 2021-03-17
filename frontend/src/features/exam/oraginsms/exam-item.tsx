import React from 'react';
import { Exam } from '@/src/api/exam';
import styled from '@emotion/styled';
import { Col } from '@/src/lib/styled-components-layout';
import { H3, Text } from '@/src/ui';

export const ExamItem: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <Wrapper>
      <Col gap="10px" align="flex-start">
        <H3>Название: {exam.name}</H3>
        <Text size={14}>Диагноз: {exam.diagnosis}</Text>
        <Text size={14}>Клиника: {exam.clinic}</Text>
        <Text size={14}>Тип: {exam.check_type}</Text>
        <Text size={14}>Создан: {exam.created}</Text>
        <Text size={14}>Обновлен: {exam.updated}</Text>
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
`;
