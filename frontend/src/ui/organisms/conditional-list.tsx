import React from 'react';
import { LoadingSpinner } from '../atoms';

interface Props<T> {
  list: T[];
  renderExists: (list: T[]) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  isLoading?: boolean;
}

export function ConditionalList<T>({
  isLoading = false,
  list,
  renderExists,
  renderEmpty = () => null,
}: Props<T>) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {list && list.filter(Boolean).length > 0
        ? renderExists(list)
        : renderEmpty()}
    </>
  );
}
