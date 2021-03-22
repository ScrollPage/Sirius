import React from "react";
import { SWRConfig } from "swr";
import axios from "axios";
import Cookie from "js-cookie";

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
          axios({
            url: url,
            baseURL: process.env.DB_HOST,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookie.get("token")}`,
            },
          }).then((r) => r.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};
