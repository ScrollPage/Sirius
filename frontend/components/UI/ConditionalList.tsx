import { usePrevious } from "@/hooks/usePrevious";
import React, { useMemo } from "react";

interface Props<T> {
  list?: T[] | null;
  error: any;
  renderExists: (list: T[]) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
  renderError: (error: any) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
}

export const ConditionalList = <T,>({
  list,
  error,
  renderExists,
  renderEmpty,
  renderError,
  renderLoading,
}: Props<T>) => {
  const prevData = usePrevious<T[]>(list);

  const loader = useMemo(
    () => (renderLoading ? renderLoading : renderExists(prevData)),
    [prevData]
  );

  return (
    <>
      {!!error
        ? renderError(error)
        : !list
        ? loader
        : list.length === 0
        ? renderEmpty
        : renderExists(list)}
    </>
  );
};
