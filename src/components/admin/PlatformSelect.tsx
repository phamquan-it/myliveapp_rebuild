import axiosClient from "@/apiClient/axiosClient";
import axiosInstance from "@/apiClient/axiosConfig";
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

const PlatformSelect: React.FC<PlatformSelectProps> = ({
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
    queryFn: () => axiosInstance.get(`/platform/list?language=${router.locale}`),
  });
  const t = useTranslations("DashboardMenu");

  const rules = required ? [{ required: true, message: t("platform") }] : [];

  return (
    <Form.Item
      label={noLabel == undefined ? t("platform") : ""}
      name="platform"
      initialValue={value}
      rules={rules} // Apply rules conditionally
      {...props} // Spread additional props here
    >
      <Select
        allowClear
        style={{ width: 200 }}
        className={className}
        showSearch
        value={value}
        placeholder="Select platform"
        options={data?.data?.data?.map((item: any) => ({
          ...item,
          value: item.id,
          label: (
            <div className="flex items-center gap-1">
              <Image src={item.icon} alt="" preview={false} width={25} />
              {item.name}
            </div>
          ),
        }))}
        onChange={onChange}
        {...props} // Spread additional props to the Select component
      />
    </Form.Item>
  );
};

export default PlatformSelect;
