import React from "react";

interface Props<T> {
  list?: T[] | null;
  error: any;
  renderExists: (list: T[]) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
  renderLoading: () => React.ReactNode;
  renderError: (error: any) => React.ReactNode;
}

export const ConditionalList = <T,>({
  list,
  error,
  renderExists,
  renderEmpty,
  renderLoading,
  renderError,
}: Props<T>) => {
  return (
    <>
      {!!error
        ? renderError(error)
        : !list
        ? renderLoading()
        : list.length === 0
        ? renderEmpty
        : renderExists(list)}
    </>
  );
};
