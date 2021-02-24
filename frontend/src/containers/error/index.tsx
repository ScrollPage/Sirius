import { Col } from '@/src/lib/styled-components-layout';
import { Box, H3 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const ErrorContainer = () => {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: '/' }, undefined, {
        shallow: false,
      });
    }, 3000);
  }, []);

  return (
    <Container>
      <Box>
        <Col align="center" gap="20px">
          <H3>Страница не найдена</H3>
          <p>Вы будете перенаправлены на главную страницу</p>
        </Col>
      </Box>
    </Container>
  );
};
