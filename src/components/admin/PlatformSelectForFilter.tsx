import axiosClient from "@/apiClient/axiosClient";
import filterOption from "@/hooks/filterOption";
import { useQuery } from "@tanstack/react-query";
import { Form, Image, Select } from "antd";
import { SelectProps } from "antd/lib";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

interface PlatformSelectProps {
  props?: SelectProps<any>;
  required?: boolean;
  onChange?: (value: any) => void;
  noLabel?: any;
  className?: string;
  value?: any;
}

const PlatformSelectForFilter: React.FC<PlatformSelectProps> = ({
  props,
  required,
  onChange,
  noLabel,
  className,
  value,
}) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["platform"],
    queryFn: () => axiosClient.get(`/platform/list?language=${router.locale}`),
  });
  const p = useTranslations("Placeholder");
  const platforms: any = data?.data?.data?.map((item: any) => ({
    ...item,
    value: item.id,
    key: item.name,
    label: (
      <div className="flex items-center gap-1">
        <Image src={item.icon} alt="" preview={false} width={25} />
        {item.name}
      </div>
    ),
  }));
  return (
    <Select
      style={{ width: 200 }}
      className={className}
      showSearch
      filterOption={filterOption}
      value={value}
      placeholder={p("selectplatform")}
      allowClear
      options={platforms}
      onChange={onChange}
      {...props} // Spread additional props to the Select component
    />
  );
};

export default PlatformSelectForFilter;
