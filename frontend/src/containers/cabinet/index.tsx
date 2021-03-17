import { $session } from '@/src/features/common';
import { ExamsList } from '@/src/features/exam';
import { Col } from '@/src/lib/styled-components-layout';
import { H1, H2 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useStore } from 'effector-react/ssr';
import React from 'react';
import { $examsIds, examsFetching } from './model';

export const CabinetContainer = () => {
  const user = useStore($session);
  const isFailed = useStore(examsFetching.isFailed);
  const examIds = useStore($examsIds);

  if (isFailed) {
    return (
      <Col align="center">
        <H2 center>Ошибка. Попробуйте позже</H2>
      </Col>
    );
  }

  return (
    <Container>
      <Col align="center">
        <H1 center>Вас зовут: {user?.first_name}</H1>
        <H2 center>Ваши исследования</H2>
        <ExamsList
          ids={examIds}
          renderEmpty={() => (
            <Col align="center">
              <H2 center>У вас пока нет исследований</H2>
            </Col>
          )}
        />
      </Col>
    </Container>
  );
};
