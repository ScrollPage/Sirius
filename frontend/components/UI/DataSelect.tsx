import React from "react";
import { SelectProps } from "@chakra-ui/select";
import { useMemo } from "react";
import useSWR from "swr";
import { Select } from "./CastomSelect";

interface IData {
  id: number;
  name: string;
}
interface DataSelectProps extends SelectProps {
  label: string;
  urlKey: string;
}

export const DataSelect: React.FC<DataSelectProps> = ({ urlKey, ...props }) => {
  const { data, error } = useSWR<IData[]>(`/api/${urlKey}/`);

  const refactorData = useMemo(() => {
    if (error || !data) {
      return;
    }
    return data;
  }, [data, error]);

  return <Select data={refactorData} {...props} />;
};
