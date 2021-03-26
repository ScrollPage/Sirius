import React from "react";
import { SWRConfig } from "swr";
import { instance } from "@/api/index";

export const SWRProvider: React.ComponentType<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnMount: true,
        revalidateOnFocus: true,
        dedupingInterval: 5000,
        fetcher: (url) =>
          instance()
            .request(url)
            .then((r) => r.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};
