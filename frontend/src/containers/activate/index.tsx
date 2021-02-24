import { getAsString } from '@/src/features/common/lib/getAsString';
import { Box, H3 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useStore, useEvent } from 'effector-react/ssr';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { activateFetching, pageMounted } from './model';

export const ActivateContainer = () => {
  const { query } = useRouter();
  const isLoading = useStore(activateFetching.isLoading);
  const isFailed = useStore(activateFetching.isFailed);
  const pageMountedEvent = useEvent(pageMounted);

  useEffect(() => {
    if (query.token) {
      pageMountedEvent(getAsString(query.token));
    }
  }, [query.token]);

  if (isLoading) {
    return (
      <Container>
        <Box>Загрузка...</Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <H3>
          Результат:{' '}
          {isFailed
            ? 'Ошибка активации, попробуйте позже'
            : 'Активация прошла успешно, можете войти'}
        </H3>
      </Box>
    </Container>
  );
};
