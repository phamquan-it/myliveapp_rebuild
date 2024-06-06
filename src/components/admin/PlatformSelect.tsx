import axiosClient from "@/apiClient/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { SelectProps } from "antd/lib";
import { useRouter } from "next/router";
import React from "react";
interface platformSelectProps {
  props: SelectProps<any>;
}
const PlatformSelect: React.FC<platformSelectProps> = ({ props }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["platform"],
    queryFn: () => axiosClient.get(`/platform/list?language=${router.locale}`),
  });
  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        {...props}
        options={data?.data.data.map((item: any) => ({
          ...item,
          label: <>{item.name} </>,
        }))}
        placeholder="Select an platform"
      />
    </>
  );
};
export default PlatformSelect;
