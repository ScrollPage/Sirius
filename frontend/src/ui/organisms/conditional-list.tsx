import React from 'react';

interface Props<T> {
  list: T[];
  renderExists: (list: T[]) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
}

export function ConditionalList<T>({
  list,
  renderExists,
  renderEmpty = () => null,
}: Props<T>) {
  return (
    <>
      {list && list.filter(Boolean).length > 0
        ? renderExists(list)
        : renderEmpty()}
    </>
  );
}
